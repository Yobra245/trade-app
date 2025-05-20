from fastapi import APIRouter
from binance.client import Client
import os

router = APIRouter()

BINANCE_API_KEY = os.getenv("BINANCE_API_KEY")
BINANCE_API_SECRET = os.getenv("BINANCE_API_SECRET")
BINANCE_TESTNET = os.getenv("BINANCE_TESTNET", "False") == "True"

client = Client(BINANCE_API_KEY, BINANCE_API_SECRET, testnet=BINANCE_TESTNET)

@router.post("/")
async def execute_trade(signal: str, symbol: str, quantity: float):
    try:
        side = "BUY" if signal.lower() == "buy" else "SELL"
        order = client.create_test_order(
            symbol=symbol,
            side=side,
            type="MARKET",
            quantity=quantity
        )
        return {"status": "executed", "symbol": symbol, "quantity": quantity, "signal": signal, "order": order}
    except Exception as e:
        return {"status": "error", "error": str(e)}