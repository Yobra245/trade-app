from binance.client import Client
from binance.enums import *
import numpy as np
from typing import Literal, TypedDict

# Initialize Binance TestNet client
TESTNET_API_KEY = "your_api_key_here"
TESTNET_SECRET = "your_secret_here"
client = Client(TESTNET_API_KEY, TESTNET_SECRET, testnet=True)

class CryptoRiskFeatures(TypedDict):
    symbol: str               # e.g., "BTCUSDT"
    volatility_24h: float     # 24h price change %
    volume_ratio: float       # current volume / avg volume
    funding_rate: float       # For futures
    position_pct: float       # Position size (% of portfolio)

def assess_crypto_risk(
    features: CryptoRiskFeatures, 
    signal: Literal["buy", "sell", "hold"]
) -> Literal["low", "moderate", "high", "extreme"]:
    """
    Binance-specific risk assessment with live market checks.
    """
    risk_score = 0.5
    
    # --- Live Data from Binance TestNet ---
    try:
        # Get current order book liquidity
        order_book = client.get_order_book(symbol=features["symbol"])
        bid_liquidity = sum(float(bid[1]) for bid in order_book["bids"][:5])
        
        # Get 24h price stats
        ticker = client.get_ticker(symbol=features["symbol"])
        price_change = float(ticker["priceChangePercent"])
        
        # Adjust risk based on live data
        if abs(price_change) > 5:  # Highly volatile
            risk_score += 0.3
        if bid_liquidity < 10:     # Low liquidity (e.g., < 10 BTC)
            risk_score += 0.2
            
    except Exception as e:
        print(f"Binance API error: {e}")
        return "extreme"  # Fail-safe
    
    # --- Position Sizing Risk ---
    if features["position_pct"] > 0.2:  # >20% of portfolio
        risk_score += 0.25
    
    # --- Funding Rate Risk (Futures) ---
    if features.get("funding_rate", 0) > 0.0005:  # High funding cost
        risk_score += 0.15
    
    # --- Signal Logic ---
    if signal == "buy" and features["volume_ratio"] < 0.7:
        risk_score += 0.1  # Avoid buying in low volume
    
    # --- Risk Tiers ---
    return (
        "low" if risk_score < 0.4 else
        "moderate" if risk_score < 0.7 else
        "high" if risk_score < 0.9 else
        "extreme"
    )

# Example Usage
features = {
    "symbol": "BTCUSDT",
    "volatility_24h": 6.2,    # 6.2% price change
    "volume_ratio": 0.65,     # 65% of avg volume
    "funding_rate": 0.0003,   # 0.03% hourly rate
    "position_pct": 0.15      # 15% of portfolio
}

risk = assess_crypto_risk(features, "buy")
print(f"Risk Level: {risk}")  # Output: "moderate" or "high"
