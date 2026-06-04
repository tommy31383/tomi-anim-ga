from __future__ import annotations

import csv
import math
from collections import deque
from dataclasses import dataclass
from typing import Iterable, Optional


@dataclass
class Bar:
    timestamp: str
    open: float
    high: float
    low: float
    close: float
    volume: float = 0.0


@dataclass
class IndicatorParams:
    lookback: int = 20
    atr_length: int = 14
    rsi_length: int = 14
    trend_ema_length: int = 50
    volume_lookback: int = 20
    stdev_mult: float = 1.8
    atr_band_mult: float = 0.8
    wick_ratio: float = 1.2
    reentry_buffer: float = 0.15
    oversold_rsi: float = 40.0
    overbought_rsi: float = 60.0
    min_volume_ratio: float = 0.6
    require_trend_alignment: bool = False
    min_band_width_pct: float = 0.002


@dataclass
class IndicatorState:
    basis: float
    upper_band: float
    lower_band: float
    atr: float
    rsi: float
    ema: float
    ema_slope: float
    volume_ratio: float
    long_signal: bool
    short_signal: bool
    long_score: float
    short_score: float


class RollingWindow:
    def __init__(self, size: int) -> None:
        self.size = size
        self.values: deque[float] = deque()
        self.sum = 0.0
        self.sum_sq = 0.0

    def push(self, value: float) -> None:
        self.values.append(value)
        self.sum += value
        self.sum_sq += value * value
        if len(self.values) > self.size:
            removed = self.values.popleft()
            self.sum -= removed
            self.sum_sq -= removed * removed

    def ready(self) -> bool:
        return len(self.values) >= self.size

    def mean(self) -> float:
        return self.sum / len(self.values)

    def stdev(self) -> float:
        count = len(self.values)
        if count < 2:
            return 0.0
        mean = self.mean()
        variance = max((self.sum_sq / count) - (mean * mean), 0.0)
        return math.sqrt(variance)


class ATRTracker:
    def __init__(self, length: int) -> None:
        self.window = RollingWindow(length)
        self.prev_close: Optional[float] = None

    def update(self, bar: Bar) -> Optional[float]:
        if self.prev_close is None:
            true_range = bar.high - bar.low
        else:
            true_range = max(
                bar.high - bar.low,
                abs(bar.high - self.prev_close),
                abs(bar.low - self.prev_close),
            )
        self.window.push(true_range)
        self.prev_close = bar.close
        if not self.window.ready():
            return None
        return self.window.mean()


class EMATracker:
    def __init__(self, length: int) -> None:
        self.length = length
        self.multiplier = 2.0 / (length + 1.0)
        self.window = RollingWindow(length)
        self.ema: Optional[float] = None
        self.prev_ema: Optional[float] = None

    def update(self, value: float) -> tuple[Optional[float], Optional[float]]:
        self.window.push(value)
        if self.ema is None:
            if not self.window.ready():
                return None, None
            self.ema = self.window.mean()
            self.prev_ema = self.ema
            return self.ema, 0.0

        previous = self.ema
        self.ema = ((value - self.ema) * self.multiplier) + self.ema
        slope = self.ema - previous
        self.prev_ema = previous
        return self.ema, slope


class RSITracker:
    def __init__(self, length: int) -> None:
        self.length = length
        self.prev_close: Optional[float] = None
        self.avg_gain: Optional[float] = None
        self.avg_loss: Optional[float] = None
        self.seed_gains: list[float] = []
        self.seed_losses: list[float] = []

    def update(self, bar: Bar) -> Optional[float]:
        if self.prev_close is None:
            self.prev_close = bar.close
            return None

        change = bar.close - self.prev_close
        gain = max(change, 0.0)
        loss = max(-change, 0.0)
        self.prev_close = bar.close

        if self.avg_gain is None or self.avg_loss is None:
            self.seed_gains.append(gain)
            self.seed_losses.append(loss)
            if len(self.seed_gains) < self.length:
                return None
            self.avg_gain = sum(self.seed_gains) / self.length
            self.avg_loss = sum(self.seed_losses) / self.length
        else:
            self.avg_gain = ((self.avg_gain * (self.length - 1)) + gain) / self.length
            self.avg_loss = ((self.avg_loss * (self.length - 1)) + loss) / self.length

        if self.avg_loss == 0:
            return 100.0
        rs = self.avg_gain / self.avg_loss
        return 100.0 - (100.0 / (1.0 + rs))


def load_ohlcv_csv(path: str) -> list[Bar]:
    with open(path, "r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        required = {"open", "high", "low", "close"}
        missing = required.difference({name.lower() for name in reader.fieldnames or []})
        if missing:
            raise ValueError(
                "CSV phai co it nhat cac cot: open, high, low, close. "
                f"Thieu: {', '.join(sorted(missing))}"
            )

        normalized_rows: list[Bar] = []
        for index, row in enumerate(reader, start=2):
            lowered = {key.lower(): value for key, value in row.items() if key}
            try:
                normalized_rows.append(
                    Bar(
                        timestamp=lowered.get("timestamp")
                        or lowered.get("time")
                        or lowered.get("date")
                        or str(index - 1),
                        open=float(lowered["open"]),
                        high=float(lowered["high"]),
                        low=float(lowered["low"]),
                        close=float(lowered["close"]),
                        volume=float(lowered.get("volume", 0.0) or 0.0),
                    )
                )
            except (KeyError, ValueError) as exc:
                raise ValueError(f"Dong CSV loi o line {index}: {exc}") from exc
    return normalized_rows


def _candle_components(bar: Bar) -> tuple[float, float, float]:
    body = abs(bar.close - bar.open)
    lower_wick = min(bar.open, bar.close) - bar.low
    upper_wick = bar.high - max(bar.open, bar.close)
    return body, lower_wick, upper_wick


def iter_indicator_states(
    bars: Iterable[Bar], params: IndicatorParams
) -> Iterable[tuple[int, Bar, Optional[IndicatorState]]]:
    closes = RollingWindow(params.lookback)
    atr_tracker = ATRTracker(params.atr_length)
    rsi_tracker = RSITracker(params.rsi_length)
    ema_tracker = EMATracker(params.trend_ema_length)
    volumes = RollingWindow(params.volume_lookback)

    for index, bar in enumerate(bars):
        closes.push(bar.close)
        volumes.push(bar.volume)
        atr = atr_tracker.update(bar)
        rsi = rsi_tracker.update(bar)
        ema, ema_slope = ema_tracker.update(bar.close)

        if (
            not closes.ready()
            or not volumes.ready()
            or atr is None
            or rsi is None
            or ema is None
            or ema_slope is None
        ):
            yield index, bar, None
            continue

        basis = closes.mean()
        stdev = closes.stdev()
        avg_volume = max(volumes.mean(), 1e-9)
        volume_ratio = bar.volume / avg_volume if bar.volume > 0 else 0.0
        min_band_width = bar.close * params.min_band_width_pct
        band_width = max(
            stdev * params.stdev_mult,
            atr * params.atr_band_mult,
            min_band_width,
        )
        upper_band = basis + band_width
        lower_band = basis - band_width

        body, lower_wick, upper_wick = _candle_components(bar)
        body_floor = max(body, 1e-9)

        long_touch = bar.low <= lower_band
        short_touch = bar.high >= upper_band
        long_reentry = bar.close >= lower_band + (band_width * params.reentry_buffer)
        short_reentry = bar.close <= upper_band - (band_width * params.reentry_buffer)
        bullish_rejection = bar.close > bar.open and (lower_wick / body_floor) >= params.wick_ratio
        bearish_rejection = bar.close < bar.open and (upper_wick / body_floor) >= params.wick_ratio
        long_trend_ok = (
            (not params.require_trend_alignment)
            or (bar.close >= ema and ema_slope >= 0.0)
        )
        short_trend_ok = (
            (not params.require_trend_alignment)
            or (bar.close <= ema and ema_slope <= 0.0)
        )
        volume_ok = volume_ratio >= params.min_volume_ratio

        long_signal = (
            long_touch
            and long_reentry
            and bullish_rejection
            and rsi <= params.oversold_rsi
            and long_trend_ok
            and volume_ok
        )
        short_signal = (
            short_touch
            and short_reentry
            and bearish_rejection
            and rsi >= params.overbought_rsi
            and short_trend_ok
            and volume_ok
        )

        long_score = 0.0
        short_score = 0.0
        if long_touch:
            long_score += 1.0
        if long_reentry:
            long_score += 1.0
        if bullish_rejection:
            long_score += min((lower_wick / body_floor) / max(params.wick_ratio, 1e-9), 2.0)
        if rsi < 50:
            long_score += (50.0 - rsi) / 25.0
        if long_trend_ok:
            long_score += 0.8
        if volume_ok:
            long_score += min(volume_ratio, 2.0) * 0.4

        if short_touch:
            short_score += 1.0
        if short_reentry:
            short_score += 1.0
        if bearish_rejection:
            short_score += min((upper_wick / body_floor) / max(params.wick_ratio, 1e-9), 2.0)
        if rsi > 50:
            short_score += (rsi - 50.0) / 25.0
        if short_trend_ok:
            short_score += 0.8
        if volume_ok:
            short_score += min(volume_ratio, 2.0) * 0.4

        yield (
            index,
            bar,
            IndicatorState(
                basis=basis,
                upper_band=upper_band,
                lower_band=lower_band,
                atr=atr,
                rsi=rsi,
                ema=ema,
                ema_slope=ema_slope,
                volume_ratio=volume_ratio,
                long_signal=long_signal,
                short_signal=short_signal,
                long_score=round(long_score, 4),
                short_score=round(short_score, 4),
            ),
        )
