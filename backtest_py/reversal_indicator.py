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
    regime_method: str = "adx"
    regime_adx_threshold: float = 25.0
    regime_slope_lookback: int = 5
    regime_ema_slope_max: float = 0.001
    regime_atr_ma_length: int = 50
    regime_atr_ratio_max: float = 1.5
    regime_dist_ema_length: int = 200
    regime_dist_pct_max: float = 0.03


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
    regime_ok: bool
    regime_metric: float
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


class DMITracker:
    def __init__(self, length: int) -> None:
        self.length = length
        self.prev_bar: Optional[Bar] = None
        self.tr_sum: Optional[float] = None
        self.plus_dm_sum: Optional[float] = None
        self.minus_dm_sum: Optional[float] = None
        self.dx_values: list[float] = []
        self.adx: Optional[float] = None

    def update(self, bar: Bar) -> Optional[float]:
        if self.prev_bar is None:
            self.prev_bar = bar
            return None

        up_move = bar.high - self.prev_bar.high
        down_move = self.prev_bar.low - bar.low
        plus_dm = up_move if up_move > down_move and up_move > 0 else 0.0
        minus_dm = down_move if down_move > up_move and down_move > 0 else 0.0
        true_range = max(
            bar.high - bar.low,
            abs(bar.high - self.prev_bar.close),
            abs(bar.low - self.prev_bar.close),
        )
        self.prev_bar = bar

        if self.tr_sum is None:
            self.dx_values.append((true_range, plus_dm, minus_dm))  # type: ignore[arg-type]
            if len(self.dx_values) < self.length:
                return None
            seed = self.dx_values[: self.length]
            self.tr_sum = sum(value[0] for value in seed)
            self.plus_dm_sum = sum(value[1] for value in seed)
            self.minus_dm_sum = sum(value[2] for value in seed)
            self.dx_values = []
        else:
            self.tr_sum = self.tr_sum - (self.tr_sum / self.length) + true_range
            self.plus_dm_sum = self.plus_dm_sum - (self.plus_dm_sum / self.length) + plus_dm
            self.minus_dm_sum = self.minus_dm_sum - (self.minus_dm_sum / self.length) + minus_dm

        if not self.tr_sum:
            return None

        plus_di = 100.0 * (self.plus_dm_sum / self.tr_sum)
        minus_di = 100.0 * (self.minus_dm_sum / self.tr_sum)
        di_sum = plus_di + minus_di
        dx = 0.0 if di_sum == 0 else 100.0 * abs(plus_di - minus_di) / di_sum

        if self.adx is None:
            self.dx_values.append(dx)
            if len(self.dx_values) < self.length:
                return None
            self.adx = sum(self.dx_values) / self.length
            self.dx_values = []
        else:
            self.adx = ((self.adx * (self.length - 1)) + dx) / self.length

        return self.adx


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


def resample_bars(bars: list[Bar], period: int) -> list[Bar]:
    """Aggregate 1h bars into higher-timeframe OHLCV bars. Drops the last partial group."""
    resampled: list[Bar] = []
    for i in range(0, len(bars) - period + 1, period):
        chunk = bars[i : i + period]
        resampled.append(
            Bar(
                timestamp=chunk[-1].timestamp,
                open=chunk[0].open,
                high=max(b.high for b in chunk),
                low=min(b.low for b in chunk),
                close=chunk[-1].close,
                volume=sum(b.volume for b in chunk),
            )
        )
    return resampled


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


def _is_ranging(
    params: IndicatorParams,
    bar: Bar,
    adx: float,
    ema: float,
    slope_reference_ema: float,
    atr: float,
    atr_ma: float,
    dist_ema: float,
) -> tuple[bool, float]:
    method = params.regime_method.lower()

    if method == "adx":
        return adx < params.regime_adx_threshold, adx

    if method == "slope":
        slope_pct = 0.0
        if slope_reference_ema != 0:
            slope_pct = abs((ema - slope_reference_ema) / slope_reference_ema)
        return slope_pct < params.regime_ema_slope_max, slope_pct

    if method == "atr":
        atr_ratio = math.inf if atr_ma <= 0 else atr / atr_ma
        return atr_ratio < params.regime_atr_ratio_max, atr_ratio

    if method == "dist":
        dist_pct = 0.0 if dist_ema == 0 else abs((bar.close - dist_ema) / dist_ema)
        return dist_pct < params.regime_dist_pct_max, dist_pct

    if method == "adx_atr":
        atr_ratio = math.inf if atr_ma <= 0 else atr / atr_ma
        regime_ok = adx < params.regime_adx_threshold and atr_ratio < params.regime_atr_ratio_max
        return regime_ok, max(adx / max(params.regime_adx_threshold, 1e-9), atr_ratio)

    if method == "adx_dist":
        dist_pct = 0.0 if dist_ema == 0 else abs((bar.close - dist_ema) / dist_ema)
        regime_ok = adx < params.regime_adx_threshold and dist_pct < params.regime_dist_pct_max
        return regime_ok, max(adx / max(params.regime_adx_threshold, 1e-9), dist_pct)

    if method == "none":
        return True, 0.0

    raise ValueError(f"Unsupported regime_method: {params.regime_method}")


def iter_indicator_states(
    bars: Iterable[Bar], params: IndicatorParams
) -> Iterable[tuple[int, Bar, Optional[IndicatorState]]]:
    closes = RollingWindow(params.lookback)
    atr_tracker = ATRTracker(params.atr_length)
    rsi_tracker = RSITracker(params.rsi_length)
    ema_tracker = EMATracker(params.trend_ema_length)
    adx_tracker = DMITracker(params.atr_length)
    volumes = RollingWindow(params.volume_lookback)
    atr_ma_window = RollingWindow(params.regime_atr_ma_length)
    ema_history = deque(maxlen=max(params.regime_slope_lookback + 1, 2))
    dist_ema_tracker = EMATracker(params.regime_dist_ema_length)

    for index, bar in enumerate(bars):
        closes.push(bar.close)
        volumes.push(bar.volume)
        atr = atr_tracker.update(bar)
        adx = adx_tracker.update(bar)
        rsi = rsi_tracker.update(bar)
        ema, ema_slope = ema_tracker.update(bar.close)
        dist_ema, _ = dist_ema_tracker.update(bar.close)

        if (
            not closes.ready()
            or not volumes.ready()
            or atr is None
            or adx is None
            or rsi is None
            or ema is None
            or ema_slope is None
            or dist_ema is None
        ):
            yield index, bar, None
            continue

        atr_ma_window.push(atr)
        ema_history.append(ema)
        if not atr_ma_window.ready() or len(ema_history) <= params.regime_slope_lookback:
            yield index, bar, None
            continue

        basis = closes.mean()
        stdev = closes.stdev()
        avg_volume = max(volumes.mean(), 1e-9)
        volume_ratio = bar.volume / avg_volume if bar.volume > 0 else 0.0
        atr_ma = atr_ma_window.mean()
        slope_reference_ema = ema_history[0]
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
        regime_ok, regime_metric = _is_ranging(
            params=params,
            bar=bar,
            adx=adx,
            ema=ema,
            slope_reference_ema=slope_reference_ema,
            atr=atr,
            atr_ma=atr_ma,
            dist_ema=dist_ema,
        )

        long_signal = (
            long_touch
            and long_reentry
            and bullish_rejection
            and rsi <= params.oversold_rsi
            and long_trend_ok
            and volume_ok
            and regime_ok
        )
        short_signal = (
            short_touch
            and short_reentry
            and bearish_rejection
            and rsi >= params.overbought_rsi
            and short_trend_ok
            and volume_ok
            and regime_ok
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
        if regime_ok:
            long_score += 1.0

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
        if regime_ok:
            short_score += 1.0

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
                regime_ok=regime_ok,
                regime_metric=round(regime_metric, 6),
                long_signal=long_signal,
                short_signal=short_signal,
                long_score=round(long_score, 4),
                short_score=round(short_score, 4),
            ),
        )
