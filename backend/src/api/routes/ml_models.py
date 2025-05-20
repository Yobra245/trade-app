from fastapi import APIRouter
from src.core.ai.predict import predict_signal

router = APIRouter()

@router.post("/predict")
async def predict_signal_endpoint(features: dict):
    signal = predict_signal(features)
    return {"signal": signal}