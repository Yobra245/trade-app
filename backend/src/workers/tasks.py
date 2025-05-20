from .celery_app import celery
from src.core.ai.predict import predict_signal

@celery.task
def async_predict_signal(features):
    return predict_signal(features)