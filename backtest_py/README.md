# Python Backtest Cho Indicator Dao Chieu Tai Nguong

Bo nay dung de backtest mot indicator kieu:

- Gia cham nguong tren/duoi.
- Nen dong cua quay lai ben trong band.
- Co wick rejection ro.
- Them xac nhan RSI de loc biet fake touch va touch yeu.

Indicator duoc thiet ke theo huong "di truoc" hon Bollinger Band co ban:

- Band dong = `max(stdev * stdev_mult, ATR * atr_band_mult, gia * min_band_width_pct)`.
- Chi bao bat tin hieu khi co `touch + reentry + wick rejection`.
- Co `signal_score` de danh gia muc do manh yeu cua setup.
- Them `trend EMA filter` de tranh bat dao roi hoac short nguoc xu huong chinh.
- Them `volume ratio filter` de loc cac touch qua yeu.

## File

- `reversal_indicator.py`: load CSV + tinh indicator.
- `run_backtest.py`: backtest, toi uu tham so, xuat trade log.
- `fetch_binance.py`: tai OHLCV tu Binance public API ra CSV.

## Dinh dang CSV

Can toi thieu cac cot:

- `open`
- `high`
- `low`
- `close`

Khuyen nghi them:

- `timestamp` hoac `time` hoac `date`
- `volume`

Vi du:

```csv
timestamp,open,high,low,close,volume
2026-01-01 00:00:00,100,101,99.2,100.8,1500
2026-01-01 01:00:00,100.8,101.4,100.1,100.3,1800
```

## Cach chay

Sau khi may co Python 3.10+:

```bash
python backtest_py/run_backtest.py --csv data.csv
```

Tai du lieu tu Binance:

```bash
python backtest_py/fetch_binance.py --symbol BTCUSDT --interval 1h --limit 1000 --out btcusdt_1h.csv
```

Backtest + toi uu tham so:

```bash
python backtest_py/run_backtest.py --csv data.csv --optimize
```

Walk-forward optimization:

```bash
python backtest_py/run_backtest.py --csv data.csv --walk-forward --train-bars 500 --test-bars 150
```

Xuat trade log:

```bash
python backtest_py/run_backtest.py --csv data.csv --optimize --export-trades trades.csv
```

Walk-forward + xuat trade log:

```bash
python backtest_py/run_backtest.py --csv data.csv --walk-forward --train-bars 500 --test-bars 150 --export-trades wf_trades.csv
```

## Logic vao lenh

### Long

- `low <= lower_band`
- `close` quay lai vao trong band
- nen bullish
- lower wick dai hon body theo `wick_ratio`
- RSI <= `oversold_rsi`
- close o tren EMA va EMA slope khong am
- volume hien tai / volume trung binh >= `min_volume_ratio`

### Short

- `high >= upper_band`
- `close` quay lai vao trong band
- nen bearish
- upper wick dai hon body theo `wick_ratio`
- RSI >= `overbought_rsi`
- close o duoi EMA va EMA slope khong duong
- volume hien tai / volume trung binh >= `min_volume_ratio`

Mac dinh vao lenh o `open` cay tiep theo.

## Logic thoat lenh

- Stop loss theo ATR
- Take profit theo ATR
- Hoac thoat khi qua `max_holding_bars`

## Walk-forward

Neu m muon tranh overfit, dung `--walk-forward`:

- Moi cua so train se optimize tham so tren qua khu.
- Sau do chi test tren doan du lieu ke tiep.
- Cuoi cung gop tat ca out-of-sample trades lai thanh mot ket qua tong.

Day la cach hop ly hon viec optimize mot lan tren toan bo lich su.

## Luu y

- Bo nay la backtest event-driven don gian, uu tien de y tuong va iterate nhanh.
- Chua mo phong slippage nang, spread theo san, partial fill, funding, regime filter nang hon.
- Neu m muon, buoc tiep theo nen them:
  - regime classifier sideway/trending
  - higher timeframe trend filter that doc tu file CSV thu hai
  - Monte Carlo trade shuffle
  - HTML chart output de xem setup vao/ra lenh

## Tinh trang xac minh

Trong workspace hien tai, lenh `python` chua co trong PATH, nen code da duoc build nhung chua the chay verify tai cho.
