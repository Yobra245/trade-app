import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type Props = {
  signal: string | null;
};

const TradeExecution: React.FC<Props> = ({ signal }) => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [quantity, setQuantity] = useState(0.001);
  const [result, setResult] = useState<any>(null);

  const handleExecute = async () => {
    if (!signal) return;
    const res = await axios.post(`${API_URL}/executions`, {
      signal,
      symbol,
      quantity,
    });
    setResult(res.data);
  };

  return (
    <div>
      <h2>Trade Execution (Binance Testnet)</h2>
      <input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
        min={0.0001}
        step={0.0001}
      />
      <button onClick={handleExecute} disabled={!signal}>
        Execute Trade
      </button>
      {result && (
        <div>
          <div>Status: {result.status}</div>
          <div>
            {result.symbol} / {result.quantity} / {result.signal}
          </div>
          {result.order && (
            <pre>{JSON.stringify(result.order, null, 2)}</pre>
          )}
          {result.error && (
            <div style={{ color: "red" }}>{result.error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TradeExecution;