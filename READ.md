# AI Trade Signal App (Binance Testnet Ready)

This is a full-stack, open-source AI trade signal platform for Binance, designed for **paper trading** using the official Binance Testnet.

## Features

- **Market data** from Binance Testnet
- **ML-based signal generation** (dummy or scikit-learn/HuggingFace)
- **Risk management**
- **Celery for async tasks**
- **React frontend** for signal/trade simulation
- **Dockerized** for local/prod use

## Quick Start

1. **Get Binance Testnet API keys:**  
   [https://testnet.binance.vision/](https://testnet.binance.vision/)
2. **Fill in `backend/.env`** with your keys.
3. **Build and run:**
   ```sh
   docker compose up --build
   ```
4. **Frontend:** [http://localhost:5173](http://localhost:5173)  
   **Backend:** [http://localhost:8000/docs](http://localhost:8000/docs)

## Project Structure

```
backend/
  src/
    api/
      routes/
    core/
      ai/
      strategies/
    workers/
  requirements.txt
  .env
frontend/
  src/
    components/
  package.json
  .env
Docker/
  Dockerfile.backend
  Dockerfile.workers
  Dockerfile.frontend
docker-compose.yml
README.md
```

## License

MIT