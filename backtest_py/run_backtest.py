from __future__ import annotations

import argparse
import csv
import itertools
import math
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Optional

from reversal_indicator import (
    Bar,
    IndicatorParams,
    iter_indicator_states,
    load_ohlcv_csv,
    resample_bars,
)


@dataclass
class StrategyParams:
    stop_atr_mult: float = 1.2
    target_atr_mult: float = 2.0
    max_holding_bars: int = 12
    fee_per_side_pct: float = 0.0004


@dataclass
class Trade:
    side: str
    entry_time: str
    exit_time: str
    entry_price: float
    exit_price: float
    stop_price: float
    target_price: float
    bars_held: int
    gross_return_pct: float
    net_return_pct: float
    exit_reason: str
    signal_score: float


@dataclass
class BacktestResult:
    trades: list[Trade]
    total_return_pct: float
    avg_return_pct: float
    win_rate_pct: float
    profit_factor: float
    max_drawdown_pct: float
    expectancy_pct: float


@dataclass
class WalkForwardWindow:
    train_start: str
    train_end: str
    test_start: str
    test_end: str
    indicator_params: IndicatorParams
    strategy_params: StrategyParams
    result: BacktestResult


@dataclass
class WalkForwardResult:
    windows: list[WalkForwardWindow]
    aggregate: BacktestResult


@dataclass
class WalkForwardWindowStats:
    positive: int
    negative: int
    flat: int


def min_required_bars(indicator_params: IndicatorParams) -> int:
    return (
        max(
            indicator_params.lookback,
            indicator_params.atr_length,
            indicator_params.rsi_length,
            indicator_params.trend_ema_length,
            indicator_params.volume_lookback,
            indicator_params.regime_atr_ma_length,
            indicator_params.regime_dist_ema_length,
        )
        + indicator_params.regime_slope_lookback
        + 2
    )


def summarize_walk_forward_windows(windows: list[WalkForwardWindow]) -> WalkForwardWindowStats:
    positive = 0
    negative = 0
    flat = 0
    for window in windows:
        if window.result.total_return_pct > 0:
            positive += 1
        elif window.result.total_return_pct < 0:
            negative += 1
        else:
            flat += 1
    return WalkForwardWindowStats(positive=positive, negative=negative, flat=flat)


def build_4h_gate(
    bars: list[Bar],
    gate_params: IndicatorParams,
    period: int = 4,
) -> list[Optional[bool]]:
    """Return per-1h-bar gate values derived from the last *completed* HTF bar.

    gate_arr[i] is None when no complete HTF bar exists yet (treated as allow),
    True when HTF regime is ranging (allow entry), False when trending (block entry).
    """
    bars_htf = resample_bars(bars, period)
    states_htf = list(iter_indicator_states(bars_htf, gate_params))
    htf_gate: list[Optional[bool]] = [
        state.regime_ok if state is not None else None
        for _, _, state in states_htf
    ]

    gate_arr: list[Optional[bool]] = [None] * len(bars)
    for i in range(len(bars)):
        k = (i // period) - 1
        if 0 <= k < len(htf_gate):
            gate_arr[i] = htf_gate[k]
    return gate_arr


def build_4h_direction_gate(
    bars: list[Bar],
    gate_params: IndicatorParams,
    period: int = 4,
) -> list[Optional[int]]:
    """Return per-1h-bar directional values derived from the last *completed* HTF bar.

    Values: +1 (bullish: slope > threshold), -1 (bearish: slope < -threshold), 0 (flat).
    None when no complete HTF bar exists yet (treated as allow both directions).
    """
    bars_htf = resample_bars(bars, period)
    states_htf = list(iter_indicator_states(bars_htf, gate_params))
    threshold = gate_params.regime_ema_slope_max

    htf_dir: list[Optional[int]] = []
    for _, bar_htf, state in states_htf:
        if state is None:
            htf_dir.append(None)
        else:
            signed_slope_pct = state.ema_slope / bar_htf.close if bar_htf.close != 0 else 0.0
            if signed_slope_pct > threshold:
                htf_dir.append(1)
            elif signed_slope_pct < -threshold:
                htf_dir.append(-1)
            else:
                htf_dir.append(0)

    dir_arr: list[Optional[int]] = [None] * len(bars)
    for i in range(len(bars)):
        k = (i // period) - 1
        if 0 <= k < len(htf_dir):
            dir_arr[i] = htf_dir[k]
    return dir_arr


def run_backtest(
    bars: list[Bar],
    indicator_params: IndicatorParams,
    strategy_params: StrategyParams,
    gate_4h_params: Optional[IndicatorParams] = None,
    gate_4h_period: int = 4,
    gate_4h_dir_params: Optional[IndicatorParams] = None,
    gate_4h_dir_period: int = 4,
    min_signal_score: float = 0.0,
) -> BacktestResult:
    if len(bars) < min_required_bars(indicator_params):
        raise ValueError("Dataset qua ngan de tinh indicator va vao lenh.")

    gate_4h: Optional[list[Optional[bool]]] = None
    if gate_4h_params is not None:
        gate_4h = build_4h_gate(bars, gate_4h_params, gate_4h_period)

    gate_4h_dir: Optional[list[Optional[int]]] = None
    if gate_4h_dir_params is not None:
        gate_4h_dir = build_4h_direction_gate(bars, gate_4h_dir_params, gate_4h_dir_period)

    states = list(iter_indicator_states(bars, indicator_params))
    trades: list[Trade] = []
    equity = 1.0
    equity_curve = [equity]

    for index, _, state in states[:-1]:
        if state is None:
            continue
        if not state.regime_ok:
            continue
        if gate_4h is not None:
            gate_val = gate_4h[index] if index < len(gate_4h) else None
            if gate_val is False:
                continue

        side: Optional[str] = None
        score = 0.0
        if state.long_signal:
            side = "long"
            score = state.long_score
        elif state.short_signal:
            side = "short"
            score = state.short_score

        if side is None:
            continue

        if score < min_signal_score:
            continue

        # Directional 4h gate: block counter-trend trades
        if gate_4h_dir is not None:
            dir_val = gate_4h_dir[index] if index < len(gate_4h_dir) else None
            if dir_val == 1 and side == "short":
                continue  # 4h bullish, no shorts
            if dir_val == -1 and side == "long":
                continue  # 4h bearish, no longs

        next_bar = bars[index + 1]
        entry_price = next_bar.open
        atr = state.atr

        if side == "long":
            stop_price = entry_price - (atr * strategy_params.stop_atr_mult)
            target_price = entry_price + (atr * strategy_params.target_atr_mult)
        else:
            stop_price = entry_price + (atr * strategy_params.stop_atr_mult)
            target_price = entry_price - (atr * strategy_params.target_atr_mult)

        trade = _simulate_trade(
            bars=bars,
            start_index=index + 1,
            side=side,
            entry_price=entry_price,
            stop_price=stop_price,
            target_price=target_price,
            strategy_params=strategy_params,
            signal_score=score,
        )
        trades.append(trade)

        equity *= 1.0 + (trade.net_return_pct / 100.0)
        equity_curve.append(equity)

    return _summarize(trades, equity_curve)


def _simulate_trade(
    bars: list[Bar],
    start_index: int,
    side: str,
    entry_price: float,
    stop_price: float,
    target_price: float,
    strategy_params: StrategyParams,
    signal_score: float,
) -> Trade:
    exit_price = entry_price
    exit_reason = "time"
    exit_time = bars[start_index].timestamp
    bars_held = 0

    for offset in range(strategy_params.max_holding_bars):
        bar_index = start_index + offset
        if bar_index >= len(bars):
            break
        bar = bars[bar_index]
        bars_held = offset + 1
        exit_time = bar.timestamp

        if side == "long":
            stop_hit = bar.low <= stop_price
            target_hit = bar.high >= target_price
            if stop_hit and target_hit:
                exit_price = stop_price
                exit_reason = "stop_and_target_same_bar"
                break
            if stop_hit:
                exit_price = stop_price
                exit_reason = "stop"
                break
            if target_hit:
                exit_price = target_price
                exit_reason = "target"
                break
        else:
            stop_hit = bar.high >= stop_price
            target_hit = bar.low <= target_price
            if stop_hit and target_hit:
                exit_price = stop_price
                exit_reason = "stop_and_target_same_bar"
                break
            if stop_hit:
                exit_price = stop_price
                exit_reason = "stop"
                break
            if target_hit:
                exit_price = target_price
                exit_reason = "target"
                break

        exit_price = bar.close
        exit_reason = "time"

    if side == "long":
        gross_return_pct = ((exit_price - entry_price) / entry_price) * 100.0
    else:
        gross_return_pct = ((entry_price - exit_price) / entry_price) * 100.0
    fees_pct = strategy_params.fee_per_side_pct * 2.0 * 100.0
    net_return_pct = gross_return_pct - fees_pct

    return Trade(
        side=side,
        entry_time=bars[start_index].timestamp,
        exit_time=exit_time,
        entry_price=round(entry_price, 6),
        exit_price=round(exit_price, 6),
        stop_price=round(stop_price, 6),
        target_price=round(target_price, 6),
        bars_held=bars_held,
        gross_return_pct=round(gross_return_pct, 4),
        net_return_pct=round(net_return_pct, 4),
        exit_reason=exit_reason,
        signal_score=round(signal_score, 4),
    )


def _summarize(trades: list[Trade], equity_curve: list[float]) -> BacktestResult:
    if not trades:
        return BacktestResult(
            trades=[],
            total_return_pct=0.0,
            avg_return_pct=0.0,
            win_rate_pct=0.0,
            profit_factor=0.0,
            max_drawdown_pct=0.0,
            expectancy_pct=0.0,
        )

    returns = [trade.net_return_pct for trade in trades]
    wins = [value for value in returns if value > 0]
    losses = [value for value in returns if value < 0]
    gross_profit = sum(wins)
    gross_loss = abs(sum(losses))

    peak = equity_curve[0]
    max_drawdown = 0.0
    for equity in equity_curve:
        peak = max(peak, equity)
        if peak > 0:
            drawdown = ((peak - equity) / peak) * 100.0
            max_drawdown = max(max_drawdown, drawdown)

    total_return_pct = ((equity_curve[-1] - 1.0) * 100.0) if equity_curve else 0.0

    return BacktestResult(
        trades=trades,
        total_return_pct=round(total_return_pct, 4),
        avg_return_pct=round(sum(returns) / len(returns), 4),
        win_rate_pct=round((len(wins) / len(trades)) * 100.0, 4),
        profit_factor=round(gross_profit / gross_loss, 4) if gross_loss > 0 else math.inf,
        max_drawdown_pct=round(max_drawdown, 4),
        expectancy_pct=round(sum(returns) / len(returns), 4),
    )


def optimize_parameters(
    bars: list[Bar],
    indicator_params: IndicatorParams,
    strategy_params: StrategyParams,
) -> tuple[IndicatorParams, StrategyParams, BacktestResult]:
    best_result: Optional[BacktestResult] = None
    best_indicator = indicator_params
    best_strategy = strategy_params
    best_score = -math.inf

    lookbacks = [14, 20]
    trend_ema_lengths = [34, 50]
    stdev_mults = [1.5, 1.8]
    atr_band_mults = [0.5, 0.8]
    wick_ratios = [1.0, 1.2]
    reentry_buffers = [0.1, 0.2]
    oversold_levels = [35.0, 40.0]
    overbought_levels = [60.0, 65.0]
    min_volume_ratios = [0.5, 0.8]
    stop_atr_mults = [1.0, 1.2]
    target_atr_mults = [1.5, 2.0]

    for (
        lookback,
        trend_ema_length,
        stdev_mult,
        atr_band_mult,
        wick_ratio,
        reentry_buffer,
        oversold_rsi,
        overbought_rsi,
        min_volume_ratio,
        stop_atr_mult,
        target_atr_mult,
    ) in itertools.product(
        lookbacks,
        trend_ema_lengths,
        stdev_mults,
        atr_band_mults,
        wick_ratios,
        reentry_buffers,
        oversold_levels,
        overbought_levels,
        min_volume_ratios,
        stop_atr_mults,
        target_atr_mults,
    ):
        candidate_indicator = IndicatorParams(
            lookback=lookback,
            atr_length=indicator_params.atr_length,
            rsi_length=indicator_params.rsi_length,
            trend_ema_length=trend_ema_length,
            volume_lookback=indicator_params.volume_lookback,
            stdev_mult=stdev_mult,
            atr_band_mult=atr_band_mult,
            wick_ratio=wick_ratio,
            reentry_buffer=reentry_buffer,
            oversold_rsi=oversold_rsi,
            overbought_rsi=overbought_rsi,
            min_volume_ratio=min_volume_ratio,
            require_trend_alignment=indicator_params.require_trend_alignment,
            min_band_width_pct=indicator_params.min_band_width_pct,
        )
        candidate_strategy = StrategyParams(
            stop_atr_mult=stop_atr_mult,
            target_atr_mult=target_atr_mult,
            max_holding_bars=strategy_params.max_holding_bars,
            fee_per_side_pct=strategy_params.fee_per_side_pct,
        )
        try:
            result = run_backtest(bars, candidate_indicator, candidate_strategy)
        except ValueError:
            continue
        if len(result.trades) < 5:
            continue
        score = result.total_return_pct - (result.max_drawdown_pct * 0.6)
        if score > best_score:
            best_result = result
            best_indicator = candidate_indicator
            best_strategy = candidate_strategy
            best_score = score

    if best_result is None:
        best_result = run_backtest(bars, indicator_params, strategy_params)
    return best_indicator, best_strategy, best_result


def run_walk_forward(
    bars: list[Bar],
    indicator_params: IndicatorParams,
    strategy_params: StrategyParams,
    train_bars: int,
    test_bars: int,
    optimize_windows: bool = False,
    gate_4h_params: Optional[IndicatorParams] = None,
    gate_4h_period: int = 4,
    gate_4h_dir_params: Optional[IndicatorParams] = None,
    gate_4h_dir_period: int = 4,
    min_signal_score: float = 0.0,
) -> WalkForwardResult:
    if train_bars < min_required_bars(indicator_params):
        raise ValueError("train_bars qua ngan cho indicator.")
    if test_bars <= 0:
        raise ValueError("test_bars phai lon hon 0.")

    windows: list[WalkForwardWindow] = []
    aggregate_trades: list[Trade] = []
    aggregate_equity = [1.0]
    cursor = train_bars

    while cursor + test_bars <= len(bars):
        train_slice = bars[cursor - train_bars : cursor]
        test_slice = bars[cursor - min_required_bars(indicator_params) : cursor + test_bars]
        if optimize_windows:
            best_indicator, best_strategy, _ = optimize_parameters(
                train_slice, indicator_params, strategy_params
            )
        else:
            best_indicator, best_strategy = indicator_params, strategy_params
        test_result = run_backtest(
            test_slice,
            best_indicator,
            best_strategy,
            gate_4h_params=gate_4h_params,
            gate_4h_period=gate_4h_period,
            gate_4h_dir_params=gate_4h_dir_params,
            gate_4h_dir_period=gate_4h_dir_period,
            min_signal_score=min_signal_score,
        )

        # Chi giu trades nam trong phan test out-of-sample.
        test_start_time = bars[cursor].timestamp
        filtered_trades = [
            trade for trade in test_result.trades if trade.entry_time >= test_start_time
        ]
        filtered_result = _summarize(
            filtered_trades,
            _equity_curve_from_trades(filtered_trades),
        )

        windows.append(
            WalkForwardWindow(
                train_start=train_slice[0].timestamp,
                train_end=train_slice[-1].timestamp,
                test_start=bars[cursor].timestamp,
                test_end=bars[cursor + test_bars - 1].timestamp,
                indicator_params=best_indicator,
                strategy_params=best_strategy,
                result=filtered_result,
            )
        )
        aggregate_trades.extend(filtered_trades)
        for trade in filtered_trades:
            next_equity = aggregate_equity[-1] * (1.0 + (trade.net_return_pct / 100.0))
            aggregate_equity.append(next_equity)
        cursor += test_bars

    if not windows:
        raise ValueError("Khong du du lieu de chay walk-forward voi train/test bars hien tai.")

    aggregate = _summarize(aggregate_trades, aggregate_equity)
    return WalkForwardResult(windows=windows, aggregate=aggregate)


def _equity_curve_from_trades(trades: list[Trade]) -> list[float]:
    equity = 1.0
    curve = [equity]
    for trade in trades:
        equity *= 1.0 + (trade.net_return_pct / 100.0)
        curve.append(equity)
    return curve


def export_trades(path: Path, trades: list[Trade]) -> None:
    fieldnames = list(asdict(trades[0]).keys()) if trades else list(asdict(Trade(
        side="",
        entry_time="",
        exit_time="",
        entry_price=0.0,
        exit_price=0.0,
        stop_price=0.0,
        target_price=0.0,
        bars_held=0,
        gross_return_pct=0.0,
        net_return_pct=0.0,
        exit_reason="",
        signal_score=0.0,
    )).keys())
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for trade in trades:
            writer.writerow(asdict(trade))


def print_summary(
    title: str,
    indicator_params: IndicatorParams,
    strategy_params: StrategyParams,
    result: BacktestResult,
) -> None:
    print(f"\n=== {title} ===")
    print("Indicator params:")
    for key, value in asdict(indicator_params).items():
        print(f"  {key}: {value}")
    print("Strategy params:")
    for key, value in asdict(strategy_params).items():
        print(f"  {key}: {value}")
    print("Performance:")
    print(f"  trades: {len(result.trades)}")
    print(f"  total_return_pct: {result.total_return_pct}")
    print(f"  avg_return_pct: {result.avg_return_pct}")
    print(f"  win_rate_pct: {result.win_rate_pct}")
    print(f"  profit_factor: {result.profit_factor}")
    print(f"  max_drawdown_pct: {result.max_drawdown_pct}")
    print(f"  expectancy_pct: {result.expectancy_pct}")


def print_walk_forward_summary(result: WalkForwardResult) -> None:
    window_stats = summarize_walk_forward_windows(result.windows)
    print("\n=== Walk Forward ===")
    print(f"windows: {len(result.windows)}")
    for index, window in enumerate(result.windows, start=1):
        print(
            f"  window {index}: train {window.train_start} -> {window.train_end}, "
            f"test {window.test_start} -> {window.test_end}, "
            f"trades={len(window.result.trades)}, total_return_pct={window.result.total_return_pct}"
        )
    print("Aggregate:")
    print(f"  trades: {len(result.aggregate.trades)}")
    print(f"  total_return_pct: {result.aggregate.total_return_pct}")
    print(f"  avg_return_pct: {result.aggregate.avg_return_pct}")
    print(f"  win_rate_pct: {result.aggregate.win_rate_pct}")
    print(f"  profit_factor: {result.aggregate.profit_factor}")
    print(f"  max_drawdown_pct: {result.aggregate.max_drawdown_pct}")
    print(
        "  windows_positive_negative_flat: "
        f"{window_stats.positive}/{window_stats.negative}/{window_stats.flat}"
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Backtest indicator bao hieu gia cham nguong va quay dau."
    )
    parser.add_argument("--csv", required=True, help="Duong dan CSV OHLCV.")
    parser.add_argument(
        "--regime-method",
        choices=["adx", "slope", "atr", "dist", "adx_atr", "adx_dist", "none"],
        default="adx",
        help="Chon regime filter 1h. Dung 'none' de tat filter 1h (nen dung cung --gate-4h).",
    )
    parser.add_argument(
        "--regime-adx-threshold",
        type=float,
        default=25.0,
        help="ADX < nguong thi coi la ranging.",
    )
    parser.add_argument(
        "--regime-ema-slope-max",
        type=float,
        default=0.001,
        help="Muc toi da cho |EMA slope pct| de coi la ranging.",
    )
    parser.add_argument(
        "--regime-slope-lookback",
        type=int,
        default=5,
        help="So bar de do do doc EMA khi dung slope filter.",
    )
    parser.add_argument(
        "--regime-atr-ratio-max",
        type=float,
        default=1.5,
        help="ATR/ATR_MA toi da de coi la ranging.",
    )
    parser.add_argument(
        "--regime-dist-pct-max",
        type=float,
        default=0.03,
        help="Khoang cach toi da giua gia va EMA dai han de coi la ranging.",
    )
    parser.add_argument(
        "--optimize",
        action="store_true",
        help="Tim bo tham so tot hon bang grid search don gian.",
    )
    parser.add_argument(
        "--walk-forward",
        action="store_true",
        help="Chay walk-forward optimization thay vi optimize tren toan bo du lieu.",
    )
    parser.add_argument(
        "--walk-forward-optimize",
        action="store_true",
        help="Cho phep optimize tung window trong walk-forward. Mac dinh tat.",
    )
    parser.add_argument(
        "--train-bars",
        type=int,
        default=500,
        help="So bars train cho moi cua so walk-forward.",
    )
    parser.add_argument(
        "--test-bars",
        type=int,
        default=150,
        help="So bars test cho moi cua so walk-forward.",
    )
    parser.add_argument(
        "--export-trades",
        help="Ghi log giao dich ra CSV.",
    )
    # 4h gate
    parser.add_argument(
        "--gate-4h",
        action="store_true",
        help="Bat 4h gate: chi vao lenh khi 4h regime OK.",
    )
    parser.add_argument(
        "--gate-4h-period",
        type=int,
        default=4,
        help="So bars 1h tao thanh 1 bar HTF (mac dinh 4).",
    )
    parser.add_argument(
        "--gate-4h-method",
        choices=["adx", "slope", "atr", "dist", "adx_atr", "adx_dist", "none"],
        default=None,
        help="Regime method cho 4h gate (mac dinh: giong --regime-method).",
    )
    parser.add_argument(
        "--gate-4h-adx-threshold",
        type=float,
        default=25.0,
        help="ADX threshold cho 4h gate.",
    )
    parser.add_argument(
        "--gate-4h-ema-slope-max",
        type=float,
        default=0.002,
        help="EMA slope max cho 4h gate (4h bars di chuyen nhieu hon 1h).",
    )
    parser.add_argument(
        "--gate-4h-slope-lookback",
        type=int,
        default=5,
        help="Slope lookback bars cho 4h gate.",
    )
    parser.add_argument(
        "--gate-4h-atr-ratio-max",
        type=float,
        default=1.5,
        help="ATR ratio max cho 4h gate.",
    )
    parser.add_argument(
        "--gate-4h-dist-pct-max",
        type=float,
        default=0.03,
        help="Dist pct max cho 4h gate.",
    )
    # Signal score filter
    parser.add_argument(
        "--min-signal-score",
        type=float,
        default=0.0,
        help="Skip signals with score below this threshold.",
    )
    # Indicator params overrides
    parser.add_argument(
        "--oversold-rsi",
        type=float,
        default=40.0,
        help="RSI oversold threshold for long signals.",
    )
    parser.add_argument(
        "--overbought-rsi",
        type=float,
        default=60.0,
        help="RSI overbought threshold for short signals.",
    )
    parser.add_argument(
        "--wick-ratio",
        type=float,
        default=1.2,
        help="Minimum wick/body ratio for rejection candle.",
    )
    # Strategy params overrides
    parser.add_argument(
        "--stop-atr-mult",
        type=float,
        default=1.2,
        help="ATR multiplier for stop loss.",
    )
    parser.add_argument(
        "--target-atr-mult",
        type=float,
        default=2.0,
        help="ATR multiplier for take profit.",
    )
    parser.add_argument(
        "--max-holding-bars",
        type=int,
        default=12,
        help="Maximum bars to hold a position before forced exit.",
    )
    parser.add_argument(
        "--min-volume-ratio",
        type=float,
        default=0.6,
        help="Minimum volume ratio (vs lookback avg) to allow signal.",
    )
    parser.add_argument(
        "--lookback",
        type=int,
        default=20,
        help="Rolling window for band basis/stdev calculation.",
    )
    parser.add_argument(
        "--stdev-mult",
        type=float,
        default=1.8,
        help="Multiplier for stdev component of band width.",
    )
    parser.add_argument(
        "--atr-band-mult",
        type=float,
        default=0.8,
        help="Multiplier for ATR component of band width.",
    )
    parser.add_argument(
        "--reentry-buffer",
        type=float,
        default=0.15,
        help="Fraction of band_width price must retrace from band edge before entry.",
    )
    parser.add_argument(
        "--trend-ema-length",
        type=int,
        default=50,
        help="EMA length used for trend/slope tracking.",
    )
    # 4h directional gate
    parser.add_argument(
        "--gate-4h-dir",
        action="store_true",
        help="Bat 4h directional gate: chi long khi 4h slope duong/flat, chi short khi 4h slope am/flat.",
    )
    parser.add_argument(
        "--gate-4h-dir-period",
        type=int,
        default=4,
        help="So bars 1h tao thanh 1 bar HTF cho directional gate (mac dinh 4).",
    )
    parser.add_argument(
        "--gate-4h-dir-method",
        choices=["adx", "slope", "atr", "dist", "adx_atr", "adx_dist", "none"],
        default="slope",
        help="Regime method cho 4h directional gate (mac dinh: slope).",
    )
    parser.add_argument(
        "--gate-4h-dir-threshold",
        type=float,
        default=0.0003,
        help="Nguong |ema_slope/close| de phan biet bullish/bearish/flat cho 4h dir gate.",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    bars = load_ohlcv_csv(args.csv)
    indicator_params = IndicatorParams(
        lookback=args.lookback,
        trend_ema_length=args.trend_ema_length,
        stdev_mult=args.stdev_mult,
        atr_band_mult=args.atr_band_mult,
        reentry_buffer=args.reentry_buffer,
        regime_method=args.regime_method,
        regime_adx_threshold=args.regime_adx_threshold,
        regime_slope_lookback=args.regime_slope_lookback,
        regime_ema_slope_max=args.regime_ema_slope_max,
        regime_atr_ratio_max=args.regime_atr_ratio_max,
        regime_dist_pct_max=args.regime_dist_pct_max,
        oversold_rsi=args.oversold_rsi,
        overbought_rsi=args.overbought_rsi,
        wick_ratio=args.wick_ratio,
        min_volume_ratio=args.min_volume_ratio,
    )
    strategy_params = StrategyParams(
        stop_atr_mult=args.stop_atr_mult,
        target_atr_mult=args.target_atr_mult,
        max_holding_bars=args.max_holding_bars,
    )
    min_signal_score: float = args.min_signal_score

    gate_4h_params: Optional[IndicatorParams] = None
    if args.gate_4h:
        gate_method = args.gate_4h_method or args.regime_method
        gate_4h_params = IndicatorParams(
            regime_method=gate_method,
            regime_adx_threshold=args.gate_4h_adx_threshold,
            regime_slope_lookback=args.gate_4h_slope_lookback,
            regime_ema_slope_max=args.gate_4h_ema_slope_max,
            regime_atr_ratio_max=args.gate_4h_atr_ratio_max,
            regime_dist_pct_max=args.gate_4h_dist_pct_max,
        )
        print(f"\n[4h gate enabled] method={gate_method}, period={args.gate_4h_period}")

    gate_4h_dir_params: Optional[IndicatorParams] = None
    if args.gate_4h_dir:
        gate_4h_dir_params = IndicatorParams(
            regime_method=args.gate_4h_dir_method,
            regime_ema_slope_max=args.gate_4h_dir_threshold,
        )
        print(f"\n[4h dir gate enabled] method={args.gate_4h_dir_method}, threshold={args.gate_4h_dir_threshold}, period={args.gate_4h_dir_period}")

    baseline = run_backtest(
        bars, indicator_params, strategy_params,
        gate_4h_params=gate_4h_params,
        gate_4h_period=args.gate_4h_period if args.gate_4h else 4,
        gate_4h_dir_params=gate_4h_dir_params,
        gate_4h_dir_period=args.gate_4h_dir_period if args.gate_4h_dir else 4,
        min_signal_score=min_signal_score,
    )
    print_summary("Baseline", indicator_params, strategy_params, baseline)

    selected_trades: list[Trade] | None = None

    if args.walk_forward:
        walk_forward_result = run_walk_forward(
            bars,
            indicator_params,
            strategy_params,
            train_bars=args.train_bars,
            test_bars=args.test_bars,
            optimize_windows=args.walk_forward_optimize,
            gate_4h_params=gate_4h_params,
            gate_4h_period=args.gate_4h_period if args.gate_4h else 4,
            gate_4h_dir_params=gate_4h_dir_params,
            gate_4h_dir_period=args.gate_4h_dir_period if args.gate_4h_dir else 4,
            min_signal_score=min_signal_score,
        )
        print_walk_forward_summary(walk_forward_result)
        selected_trades = walk_forward_result.aggregate.trades
    elif args.optimize:
        best_indicator, best_strategy, best_result = optimize_parameters(
            bars, indicator_params, strategy_params
        )
        print_summary("Optimized", best_indicator, best_strategy, best_result)
        selected_trades = best_result.trades

    if args.export_trades:
        if selected_trades is None:
            print("\n[WARN] --export-trades chi hoat dong voi --optimize hoac --walk-forward. Bo qua.")
        else:
            export_path = Path(args.export_trades)
            export_trades(export_path, selected_trades)
            print(f"\nDa xuat {len(selected_trades)} trades ra: {export_path}")


if __name__ == "__main__":
    main()
