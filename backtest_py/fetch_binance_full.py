from __future__ import annotations

import csv
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines"
PAGE_LIMIT = 1000


def fetch_page(symbol: str, interval: str, start_ms: int, limit: int = PAGE_LIMIT) -> list[list]:
    query = urllib.parse.urlencode({
        "symbol": symbol.upper(),
        "interval": interval,
        "startTime": start_ms,
        "limit": limit,
    })
    req = urllib.request.Request(f"{BINANCE_KLINES_URL}?{query}")
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read().decode("utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"Binance error: {data}")
    return data


def fetch_all(symbol: str, interval: str, start_ms: int, end_ms: int | None = None) -> list[list]:
    all_rows: list[list] = []
    cursor = start_ms
    now_ms = end_ms or int(time.time() * 1000)
    print(f"Fetching {symbol} {interval} from {time.strftime('%Y-%m-%d', time.gmtime(start_ms/1000))} ...")
    while cursor < now_ms:
        page = fetch_page(symbol, interval, cursor)
        if not page:
            break
        # dedup: skip trùng candle cuối
        if all_rows and all_rows[-1][0] == page[0][0]:
            page = page[1:]
        all_rows.extend(page)
        last_open_ms = int(page[-1][0])
        last_close_ms = int(page[-1][6])
        print(f"  ... {len(all_rows):,} bars  (last: {time.strftime('%Y-%m-%d %H:%M', time.gmtime(last_open_ms/1000))})")
        if last_close_ms >= now_ms or len(page) < PAGE_LIMIT:
            break
        cursor = last_open_ms + 1
        time.sleep(0.12)   # ~8 req/s — Binance rate limit 1200/min
    return all_rows


def export_csv(path: Path, rows: list[list]) -> None:
    with path.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["timestamp","open","high","low","close","volume",
                    "close_time","quote_asset_volume","number_of_trades",
                    "taker_buy_base","taker_buy_quote"])
        for row in rows:
            w.writerow([
                time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(int(row[0])/1000)),
                row[1], row[2], row[3], row[4], row[5],
                time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(int(row[6])/1000)),
                row[7], row[8], row[9], row[10],
            ])


if __name__ == "__main__":
    import argparse, datetime
    p = argparse.ArgumentParser()
    p.add_argument("--symbol",   default="BTCUSDT")
    p.add_argument("--interval", default="1h")
    p.add_argument("--years",    type=int, default=7, help="So nam nhin lai tu hom nay")
    p.add_argument("--out",      required=True)
    args = p.parse_args()

    now = datetime.datetime.utcnow()
    start_dt = now.replace(year=now.year - args.years,
                           hour=0, minute=0, second=0, microsecond=0)
    start_ms = int(start_dt.timestamp() * 1000)

    rows = fetch_all(args.symbol, args.interval, start_ms)
    out = Path(args.out)
    export_csv(out, rows)
    print(f"\nXong: {len(rows):,} candles -> {out}")
