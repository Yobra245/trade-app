from fastapi import APIRouter
from src.core.ai.predict import predict_signal
from src.core.strategies.risk_management import assess_risk

router = APIRouter()

@router.post("/")
async def generate_signal(market_features: dict):
    signal = predict_signal(market_features)
    risk = assess_risk(market_features, signal)
    return {"signal": signal, "risk": risk}