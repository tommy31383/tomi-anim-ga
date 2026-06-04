# Backtest Report: BTCUSDT 1h — 7 năm

Ngày chạy: 2026-06-04

## Dataset

- Nguồn: Binance public API
- Symbol: `BTCUSDT`
- Timeframe: `1h`
- Số candles: `61,337`
- Khoảng thời gian: `2019-06-03` → `2026-06-04`
- File dữ liệu: `btcusdt_1h_7y.csv`
- Script fetch: `fetch_binance_full.py` (pagination tự động, không giới hạn 1000 bars)

## Lệnh đã chạy

```bash
py backtest_py/fetch_binance_full.py --symbol BTCUSDT --interval 1h --years 7 --out backtest_py/btcusdt_1h_7y.csv
py backtest_py/run_backtest.py --csv backtest_py/btcusdt_1h_7y.csv
py backtest_py/run_backtest.py --csv backtest_py/btcusdt_1h_7y.csv --optimize --export-trades backtest_py/btcusdt_1h_7y_optimized_trades.csv
py backtest_py/run_backtest.py --csv backtest_py/btcusdt_1h_7y.csv --walk-forward --train-bars 8760 --test-bars 2190 --export-trades backtest_py/btcusdt_1h_7y_walkforward_trades.csv
```

---

## Tổng kết nhanh

| Chế độ | Trades | WR | PF | Return | MaxDD |
|---|---|---|---|---|---|
| Baseline | 500 | 44.0% | 1.003 | −4.83% | 41.6% |
| Optimized (in-sample) | 627 | 49.3% | 1.12 | +42.0% | 30.7% |
| **Walk-forward (out-of-sample)** | **420** | **41.9%** | **0.82** | **−39.3%** | **52.2%** |

**Verdict: walk-forward âm — edge không giữ qua thời gian, overfit rõ ràng.**

---

## Baseline

Indicator params:

- `lookback = 20`
- `atr_length = 14`
- `rsi_length = 14`
- `trend_ema_length = 50`
- `stdev_mult = 1.8`
- `atr_band_mult = 0.8`
- `wick_ratio = 1.2`
- `reentry_buffer = 0.15`
- `oversold_rsi = 40.0`
- `overbought_rsi = 60.0`
- `min_volume_ratio = 0.6`
- `require_trend_alignment = False`

Strategy params:

- `stop_atr_mult = 1.2`
- `target_atr_mult = 2.0`
- `max_holding_bars = 12`
- `fee_per_side_pct = 0.0004`

Kết quả:

- Trades: `500`
- Total return: `−4.83%`
- Avg return/trade: `+0.0019%`
- Win rate: `44.0%`
- Profit factor: `1.003`
- Max drawdown: `41.6%`

Nhận xét: 500 trades đủ thống kê. WR 44%, PF 1.003 = gần random hoàn toàn. Edge gần như bằng 0 trên params mặc định.

---

## Optimized (In-Sample)

Indicator params tìm được:

- `lookback = 14`
- `trend_ema_length = 34`
- `atr_band_mult = 0.5`
- `reentry_buffer = 0.2`
- `min_volume_ratio = 0.5`
- *(các params khác giữ nguyên baseline)*

Strategy params:

- `stop_atr_mult = 1.2`
- `target_atr_mult = 1.5`

Kết quả:

- Trades: `627`
- Total return: `+42.0%`
- Avg return/trade: `+0.0664%`
- Win rate: `49.3%`
- Profit factor: `1.12`
- Max drawdown: `30.7%`
- Trade log: `btcusdt_1h_7y_optimized_trades.csv`

Nhận xét: Trông đẹp nhưng **đây là in-sample** — optimize trên toàn bộ 7 năm. WR 49%, PF 1.12 = edge **rất mỏng**, dễ bị fee/slippage thực tế ăn hết. Walk-forward bên dưới là test thật.

---

## Walk-Forward Out-of-Sample

Config:

- `train_bars = 8760` (~1 năm)
- `test_bars = 2190` (~3 tháng)
- Số cửa sổ: `24`

Từng cửa sổ:

| # | Train | Test | Trades | Return |
|---|---|---|---|---|
| 1 | 2019-06-03 → 2020-06-03 | 2020-06-03 → 2020-09-02 | 16 | −0.28% |
| 2 | 2019-09-03 → 2020-09-02 | 2020-09-02 → 2020-12-03 | 35 | +4.27% ✅ |
| 3 | 2019-12-03 → 2020-12-03 | 2020-12-03 → 2021-03-04 | 19 | −16.72% ❌ |
| 4 | 2020-03-04 → 2021-03-04 | 2021-03-04 → 2021-06-04 | 38 | −21.86% ❌ |
| 5 | 2020-06-03 → 2021-06-04 | 2021-06-04 → 2021-09-03 | 18 | −6.52% ❌ |
| 6 | 2020-09-02 → 2021-09-03 | 2021-09-03 → 2021-12-03 | 19 | −10.91% ❌ |
| 7 | 2020-12-03 → 2021-12-03 | 2021-12-04 → 2022-03-05 | 5 | −5.49% ❌ |
| 8 | 2021-03-04 → 2022-03-05 | 2022-03-05 → 2022-06-04 | 3 | −3.38% ❌ |
| 9 | 2021-06-04 → 2022-06-04 | 2022-06-04 → 2022-09-03 | 9 | +5.24% ✅ |
| 10 | 2021-09-03 → 2022-09-03 | 2022-09-03 → 2022-12-03 | 11 | +5.54% ✅ |
| 11 | 2021-12-04 → 2022-12-03 | 2022-12-04 → 2023-03-05 | 17 | +4.64% ✅ |
| 12 | 2022-03-05 → 2023-03-05 | 2023-03-05 → 2023-06-04 | 28 | −5.16% ❌ |
| 13 | 2022-06-04 → 2023-06-04 | 2023-06-04 → 2023-09-03 | 7 | −3.26% ❌ |
| 14 | 2022-09-03 → 2023-09-03 | 2023-09-03 → 2023-12-04 | 32 | +0.31% ≈ |
| 15 | 2022-12-04 → 2023-12-04 | 2023-12-04 → 2024-03-04 | 8 | −1.93% ❌ |
| 16 | 2023-03-05 → 2024-03-04 | 2024-03-04 → 2024-06-03 | 5 | −0.50% ❌ |
| 17 | 2023-06-04 → 2024-06-03 | 2024-06-03 → 2024-09-02 | 18 | +0.04% ≈ |
| 18 | 2023-09-03 → 2024-09-02 | 2024-09-02 → 2024-12-03 | 19 | +3.71% ✅ |
| 19 | 2023-12-04 → 2024-12-03 | 2024-12-03 → 2025-03-04 | 7 | +5.98% ✅ |
| 20 | 2024-03-04 → 2025-03-04 | 2025-03-04 → 2025-06-03 | 16 | +0.72% ✅ |
| 21 | 2024-06-03 → 2025-06-03 | 2025-06-03 → 2025-09-02 | 36 | +0.09% ≈ |
| 22 | 2024-09-02 → 2025-09-02 | 2025-09-02 → 2025-12-03 | 18 | +0.04% ≈ |
| 23 | 2024-12-03 → 2025-12-03 | 2025-12-03 → 2026-03-04 | 22 | +1.80% ✅ |
| 24 | 2025-03-04 → 2026-03-04 | 2026-03-04 → 2026-06-03 | 14 | +0.11% ≈ |

Aggregate out-of-sample:

- Trades: `420`
- Total return: `−39.3%`
- Avg return/trade: `−0.109%`
- Win rate: `41.9%`
- Profit factor: `0.82`
- Max drawdown: `52.2%`
- Trade log: `btcusdt_1h_7y_walkforward_trades.csv`

Nhận xét: **9/24 cửa sổ dương, 11 âm, 4 hòa.** Thua nặng nhất ở bull run 2020-21 (window 3-6, mỗi cửa sổ mất 6-22%). Recover nhẹ ở bear 2022. Gần đây (2024-26) ra hòa/dương nhỏ.

---

## Kết luận

### Edge không giữ qua thời gian

Walk-forward **PF 0.82, −39.3%** xác nhận overfit in-sample. Indicator bắt reversal không phân biệt regime:

- **Bull mạnh (2020-21):** bắt reversal LONG liên tục khi giá đang trend → bị stoploss.
- **Bear 2022:** short signal hoạt động tốt hơn (window 9-11 dương).
- **Sideways 2023-26:** kết quả gần hòa, edge không đủ để phủ fee.

### Nguyên nhân gốc

Indicator thuần reversal (BB touch / RSI cross / Stoch cross) **không có regime filter** → fire signal kả trong trend lẫn range → win rate dao động theo regime thị trường, không ổn định.

### Việc cần làm để có edge thật

1. **Thêm regime filter** — chỉ bắt reversal khi RANGE (sideways), skip BULL/BEAR trend. Đây là thứ hedge05 làm đúng và giải thích tại sao hedge05 hoạt động ở bear 2022.
2. **HTF trend gate** — 4h/1d trend confirmation trước khi entry 1h.
3. **Tăng selectivity** — `require_trend_alignment = True`, stricter volume filter.
4. **Chạy lại walk-forward sau khi thêm regime filter** — đây mới là test thật của edge mới.

---

## So sánh với 1000-bar (lần trước)

| | 1000 bars | 7 năm (61k bars) |
|---|---|---|
| Baseline WR | 40% | 44% |
| Baseline PF | 0.98 | 1.003 |
| Optimized trades | 13 | 627 |
| Optimized PF | **4.25** | **1.12** |
| Walk-fwd PF | **3.56** | **0.82** |

→ 1000-bar cho kết quả lạc quan quá mức (overfit nặng hơn do sample nhỏ). 7 năm mới là bức tranh thật.
