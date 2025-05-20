import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

MODEL_PATH = os.environ.get("MODEL_PATH", "models/")
MODEL_FILE = os.path.join(MODEL_PATH, "rf_model.joblib")

def predict_signal(features: dict):
    # For demo: use random logic or load a real model
    if os.path.exists(MODEL_FILE):
        model = joblib.load(MODEL_FILE)
        X = np.array([list(features.values())])
        pred = model.predict(X)[0]
        return "buy" if pred == 1 else "sell"
    # Fallback: random
    return np.random.choice(["buy", "sell", "hold"])