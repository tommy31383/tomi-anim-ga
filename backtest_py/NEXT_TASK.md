# Task Brief: Regime-Aware Reversal Filter

**Dành cho AI tiếp theo. Đọc file này trước, rồi đọc `BTCUSDT_7y_report.md` để hiểu context.**

---

## Kết luận research hiện tại

- Framework backtest hoạt động tốt (`reversal_indicator.py` + `run_backtest.py` + `fetch_binance_full.py`).
- `Pure reversal` trên BTCUSDT 1h **không bền vững**: WF out-of-sample PF=0.82, −39.3% trên 7 năm.
- In-sample đẹp (PF 1.12) nhưng là overfit — params fit lịch sử, không predict tương lai.
- **Nguyên nhân gốc:** indicator fire signal cả khi trend mạnh (bull 2020-21) → bị stoploss liên tục.

---

## Việc cần làm — theo thứ tự

### Bước 1: Regime Filter (ưu tiên cao nhất)

**Mục tiêu:** chỉ cho entry khi thị trường đang *range/sideways*, block khi trend mạnh.

Implement trong `reversal_indicator.py`:
- Thêm `RegimeFilter` class hoặc function `is_ranging(bars, params) -> bool`
- Tích hợp vào `IndicatorState` — thêm field `regime_ok: bool`
- `run_backtest.py` skip entry nếu `state.regime_ok == False`

Gợi ý logic (chọn 1-2 cái, test từng cái):

```python
# A. ADX-based (cần tính DMI/ADX từ high/low/close)
# ranging nếu ADX(14) < 25
adx = calc_adx(bars, 14)
regime_ok = adx < 25

# B. EMA slope
# ranging nếu |slope EMA50| / price < 0.001 (0.1%/bar)
ema50_slope = (ema50[-1] - ema50[-5]) / ema50[-5]
regime_ok = abs(ema50_slope) < 0.001

# C. ATR expansion (đơn giản nhất)
# ranging nếu ATR hiện tại < 1.5× ATR trung bình 50 bar
atr_ratio = atr_current / atr_ma50
regime_ok = atr_ratio < 1.5

# D. Distance from EMA200
# ranging nếu |price - EMA200| / EMA200 < 3%
dist_pct = abs(price - ema200) / ema200
regime_ok = dist_pct < 0.03
```

**Thêm vào `IndicatorParams`:**
```python
regime_adx_threshold: float = 25.0      # ADX < N = ranging
regime_ema_slope_max: float = 0.001     # |slope| < N = flat
regime_atr_ratio_max: float = 1.5      # ATR/ATR_MA < N = not expanding
regime_method: str = "adx"             # "adx" | "slope" | "atr" | "dist"
```

Sau khi implement: chạy walk-forward lại và so sánh PF với baseline 0.82.

---

### Bước 2: Higher Timeframe Gate (sau khi Bước 1 xong)

**Mục tiêu:** 1h entry nhưng phải hỏi ý kiến 4h.

- Fetch thêm `btcusdt_4h_7y.csv` (dùng `fetch_binance_full.py --interval 4h`).
- `run_backtest.py` load cả 2 TF, align theo timestamp.
- Rule: tại thời điểm entry 1h, lấy 4h bar tương ứng:
  - 4h bullish (close > EMA20 4h) → block SHORT reversal
  - 4h bearish (close < EMA20 4h) → block LONG reversal
  - Hoặc chỉ cho entry khi 4h cũng "ranging" (ADX 4h < 30)

---

### Bước 3: Signal Selectivity (sau Bước 1+2)

Sau khi có regime filter, số lệnh giảm → có thể siết thêm:
- `require_trend_alignment = True`
- `min_volume_ratio` tăng lên 0.8-1.0
- `wick_ratio` tăng lên 1.5
- `oversold_rsi` giảm xuống 30, `overbought_rsi` tăng lên 70

Mục tiêu: ít lệnh hơn nhưng quality cao hơn.

---

## File structure

```
backtest_py/
  reversal_indicator.py       ← thêm RegimeFilter vào đây
  run_backtest.py             ← skip entry khi regime_ok=False
  fetch_binance_full.py       ← dùng để fetch thêm 4h data
  btcusdt_1h_7y.csv           ← data 7y đã có (61,337 bars)
  btcusdt_1h_7y_optimized_trades.csv
  btcusdt_1h_7y_walkforward_trades.csv
  BTCUSDT_7y_report.md        ← kết quả research cũ, đọc để hiểu baseline
  NEXT_TASK.md                ← file này
```

---

## Định nghĩa "thành công"

Walk-forward out-of-sample (24 windows, 7 năm) đạt:
- `PF > 1.2`
- `Win rate > 48%`
- `> 15/24 windows dương`
- `Max drawdown < 30%`

Nếu sau Bước 1 chưa đạt → thêm Bước 2 rồi test lại. Không nhảy thẳng vào optimize params.

---

## Lưu ý quan trọng

- **Không optimize thêm trên logic cũ** — đã confirm overfit, optimize thêm chỉ làm nặng hơn.
- **Test từng thay đổi bằng walk-forward**, không dùng in-sample để đánh giá.
- **Commit sau mỗi bước** kèm kết quả WF trong commit message.
