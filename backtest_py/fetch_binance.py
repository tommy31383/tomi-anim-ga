from __future__ import annotations

import argparse
import csv
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path


BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines"


def fetch_klines(symbol: str, interval: str, limit: int) -> list[list]:
    limit = max(1, min(limit, 1000))
    query = urllib.parse.urlencode(
        {
            "symbol": symbol.upper(),
            "interval": interval,
            "limit": limit,
        }
    )
    request = urllib.request.Request(f"{BINANCE_KLINES_URL}?{query}")
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = response.read().decode("utf-8")
    data = json.loads(payload)
    if not isinstance(data, list):
        raise ValueError(f"Phan hoi Binance khong hop le: {data}")
    return data


def export_csv(path: Path, rows: list[list]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(
            [
                "timestamp",
                "open",
                "high",
                "low",
                "close",
                "volume",
                "close_time",
                "quote_asset_volume",
                "number_of_trades",
                "taker_buy_base",
                "taker_buy_quote",
            ]
        )
        for row in rows:
            open_time_ms = int(row[0])
            close_time_ms = int(row[6])
            writer.writerow(
                [
                    time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(open_time_ms / 1000)),
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(close_time_ms / 1000)),
                    row[7],
                    row[8],
                    row[9],
                    row[10],
                ]
            )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Tai OHLCV tu Binance ra CSV.")
    parser.add_argument("--symbol", required=True, help="Vi du BTCUSDT, ETHUSDT")
    parser.add_argument("--interval", default="1h", help="Vi du 15m, 1h, 4h, 1d")
    parser.add_argument("--limit", type=int, default=1000, help="So bars toi da 1000")
    parser.add_argument("--out", required=True, help="File CSV output")
    return parser


def main() -> None:
    args = build_parser().parse_args()
    rows = fetch_klines(args.symbol, args.interval, args.limit)
    export_csv(Path(args.out), rows)
    print(f"Da tai {len(rows)} candles tu Binance ra {args.out}")


if __name__ == "__main__":
    main()
