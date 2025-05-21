import numpy as np
from typing import Literal, TypedDict
from sklearn.ensemble import IsolationForest  # For anomaly detection

# Type hints for better maintainability
class RiskFeatures(TypedDict):
    volatility: float
    liquidity: float
    drawdown: float
    position_size: float
    market_sentiment: float  # -1 (bearish) to 1 (bullish)

RiskLevel = Literal["low", "moderate", "high", "extreme"]

def assess_risk(
    features: RiskFeatures, 
    signal: Literal["buy", "sell", "hold"],
    model: IsolationForest = None  # Optional AI model
) -> RiskLevel:
    """
    Advanced risk assessment combining rules and ML.
    
    Args:
        features: Dict containing market/position metrics.
        signal: Trading intent.
        model: Pre-trained anomaly detector (IsolationForest/LOF).
    
    Returns:
        RiskLevel: Stratified risk classification.
    """
    # Base risk score (0-1 scale)
    risk_score = 0.5  # Neutral baseline
    
    # --- Rule-based Risk Factors ---
    # Volatility adjustment (e.g., VIX > 30)
    risk_score += 0.15 * (features["volatility"] / 0.05)  # Scale by threshold
    
    # Liquidity risk (e.g., order book depth)
    if features["liquidity"] < 1e6:  # $1M liquidity threshold
        risk_score += 0.2
    
    # Position sizing risk
    risk_score += min(0.25, features["position_size"] * 0.1)
    
    # --- AI Anomaly Detection ---
    if model:
        X = np.array([[features["volatility"], features["drawdown"]]])
        is_anomaly = model.predict(X)[0] == -1
        if is_anomaly:
            risk_score += 0.3  # Penalize anomalous conditions
    
    # --- Signal-Specific Rules ---
    if signal == "buy":
        if features["market_sentiment"] < -0.5:
            risk_score += 0.25  # Avoid buying in strong bear markets
    
    # --- Risk Stratification ---
    if risk_score < 0.4:
        return "low"
    elif 0.4 <= risk_score < 0.7:
        return "moderate"
    elif 0.7 <= risk_score < 0.9:
        return "high"
    else:
        return "extreme"  # Potential margin call territory 
