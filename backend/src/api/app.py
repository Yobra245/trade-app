from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import market_data, ml_models, signals, executions

app = FastAPI(title="Trade Signal App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market_data.router, prefix="/market-data", tags=["Market Data"])
app.include_router(ml_models.router, prefix="/ml-models", tags=["ML Models"])
app.include_router(signals.router, prefix="/signals", tags=["Signals"])
app.include_router(executions.router, prefix="/executions", tags=["Executions"])