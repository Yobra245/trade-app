def assess_risk(features: dict, signal: str) -> str:
    # Placeholder for sophisticated risk assessment
    risk_score = 0.5  # Would be ML or rule-based in real use
    if features.get("volatility", 0) > 0.05:
        risk_score += 0.3
    if signal == "buy":
        return "moderate" if risk_score < 0.7 else "high"
    return "low"