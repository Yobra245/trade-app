from fastapi import APIRouter
from binance.client import Client
import os
import pandas as pd

router = APIRouter()

BINANCE_API_KEY = os.getenv("BINANCE_API_KEY")
BINANCE_API_SECRET = os.getenv("BINANCE_API_SECRET")
BINANCE_TESTNET = os.getenv("BINANCE_TESTNET", "False") == "True"

client = Client(BINANCE_API_KEY, BINANCE_API_SECRET, testnet=BINANCE_TESTNET)

period_map = {
    "1d": "1 day ago UTC",
    "1w": "1 week ago UTC",
    "1mo": "1 month ago UTC"
}

@router.get("/")
async def get_market_data(
    symbol: str = "BTCUSDT",
    period: str = "1mo",
    interval: str = "1d"
):
    klines = client.get_historical_klines(
        symbol=symbol,
        interval=interval,
        start_str=period_map.get(period, "1 month ago UTC")
    )
    df = pd.DataFrame(klines, columns=[
        "Open time", "Open", "High", "Low", "Close", "Volume",
        "Close time", "Quote asset volume", "Number of trades",
        "Taker buy base asset volume", "Taker buy quote asset volume", "Ignore"
    ])
    for col in ["Open", "High", "Low", "Close", "Volume"]:
        df[col] = df[col].astype(float)
    df["Open time"] = pd.to_datetime(df["Open time"], unit="ms")
    return df[["Open time", "Open", "High", "Low", "Close", "Volume"]].to_dict(orient="records")