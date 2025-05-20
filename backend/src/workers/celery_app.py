from celery import Celery
import os

celery = Celery(
    "trade_signals",
    broker=os.environ.get("REDIS_URL", "redis://localhost:6379/0"),
    backend=os.environ.get("REDIS_URL", "redis://localhost:6379/0"),
)

celery.conf.update(task_serializer="json", result_serializer="json", accept_content=["json"])