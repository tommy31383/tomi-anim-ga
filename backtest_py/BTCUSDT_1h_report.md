# Backtest Report: BTCUSDT 1h

Ngay chay: 2026-06-04

## Dataset

- Nguon: Binance public API
- Symbol: `BTCUSDT`
- Timeframe: `1h`
- So candles: `1000`
- File du lieu: [btcusdt_1h.csv](E:/AI/AnimChar/Universal-LPC-Spritesheet-Character-Generator/backtest_py/btcusdt_1h.csv)

## Lenh da chay

```bash
py backtest_py/fetch_binance.py --symbol BTCUSDT --interval 1h --limit 1000 --out backtest_py/btcusdt_1h.csv
py backtest_py/run_backtest.py --csv backtest_py/btcusdt_1h.csv
py backtest_py/run_backtest.py --csv backtest_py/btcusdt_1h.csv --optimize --export-trades backtest_py/btcusdt_1h_optimized_trades.csv
py backtest_py/run_backtest.py --csv backtest_py/btcusdt_1h.csv --walk-forward --train-bars 500 --test-bars 150 --export-trades backtest_py/btcusdt_1h_walkforward_trades.csv
```

## Baseline

Indicator params:

- `lookback = 20`
- `atr_length = 14`
- `rsi_length = 14`
- `trend_ema_length = 50`
- `volume_lookback = 20`
- `stdev_mult = 1.8`
- `atr_band_mult = 0.8`
- `wick_ratio = 1.2`
- `reentry_buffer = 0.15`
- `oversold_rsi = 40.0`
- `overbought_rsi = 60.0`
- `min_volume_ratio = 0.6`
- `require_trend_alignment = False`
- `min_band_width_pct = 0.002`

Strategy params:

- `stop_atr_mult = 1.2`
- `target_atr_mult = 2.0`
- `max_holding_bars = 12`
- `fee_per_side_pct = 0.0004`

Ket qua:

- Trades: `10`
- Total return: `-0.0865%`
- Avg return/trade: `-0.0059%`
- Win rate: `40.0%`
- Profit factor: `0.9836`
- Max drawdown: `1.6163%`
- Expectancy: `-0.0059%`

Nhan xet nhanh:

- Baseline gan nhu hoa von.
- Co setup vao lenh, nhung edge chua ro.

## Optimized In-Sample

Indicator params:

- `lookback = 14`
- `atr_length = 14`
- `rsi_length = 14`
- `trend_ema_length = 34`
- `volume_lookback = 20`
- `stdev_mult = 1.8`
- `atr_band_mult = 0.5`
- `wick_ratio = 1.2`
- `reentry_buffer = 0.1`
- `oversold_rsi = 40.0`
- `overbought_rsi = 65.0`
- `min_volume_ratio = 0.5`
- `require_trend_alignment = False`
- `min_band_width_pct = 0.002`

Strategy params:

- `stop_atr_mult = 1.0`
- `target_atr_mult = 1.5`
- `max_holding_bars = 12`
- `fee_per_side_pct = 0.0004`

Ket qua:

- Trades: `13`
- Total return: `5.6291%`
- Avg return/trade: `0.4237%`
- Win rate: `76.9231%`
- Profit factor: `4.2469`
- Max drawdown: `0.7217%`
- Expectancy: `0.4237%`

Trade log:

- [btcusdt_1h_optimized_trades.csv](E:/AI/AnimChar/Universal-LPC-Spritesheet-Character-Generator/backtest_py/btcusdt_1h_optimized_trades.csv)

Nhan xet nhanh:

- Ket qua dep ro ret tren cung bo du lieu optimize.
- Day la in-sample, nen chi dung de tim huong tham so, khong nen tin 100%.

## Walk-Forward Out-of-Sample

Config:

- `train_bars = 500`
- `test_bars = 150`
- So cua so walk-forward: `3`

Tung cua so:

1. Train `2026-04-23 11:00:00 -> 2026-05-14 06:00:00`
   Test `2026-05-14 07:00:00 -> 2026-05-20 12:00:00`
   Trades: `2`
   Total return: `1.6515%`

2. Train `2026-04-29 17:00:00 -> 2026-05-20 12:00:00`
   Test `2026-05-20 13:00:00 -> 2026-05-26 18:00:00`
   Trades: `1`
   Total return: `0.7411%`

3. Train `2026-05-05 23:00:00 -> 2026-05-26 18:00:00`
   Test `2026-05-26 19:00:00 -> 2026-06-02 00:00:00`
   Trades: `2`
   Total return: `-0.5401%`

Aggregate out-of-sample:

- Trades: `5`
- Total return: `1.8517%`
- Avg return/trade: `0.3694%`
- Win rate: `80.0%`
- Profit factor: `3.5594`
- Max drawdown: `0.7217%`

Trade log:

- [btcusdt_1h_walkforward_trades.csv](E:/AI/AnimChar/Universal-LPC-Spritesheet-Character-Generator/backtest_py/btcusdt_1h_walkforward_trades.csv)

Nhan xet nhanh:

- Walk-forward van duong, day la diem tot nhat cua lan run nay.
- So trade out-of-sample con it, nen chua du de ket luan manh.

## Ket luan

- Indicator nay co kha nang bat setup dao chieu sau khi gia cham nguong va quay dau.
- Baseline chua tot.
- Sau optimize, edge cai thien ro.
- Walk-forward van duong, nen co dau hieu edge khong chi la overfit thuần tuy.

## Viec nen lam tiep

1. Chay tren nhieu symbol: `ETHUSDT`, `SOLUSDT`, `BNBUSDT`.
2. Chay tren nhieu timeframe: `15m`, `4h`.
3. Tang so du lieu len nhieu nghin candles.
4. Them report HTML/chart danh dau diem vao ra.
5. Them portfolio report neu m muon test nhieu cap cung luc.
