import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const MarketData: React.FC = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/market-data`, {
        params: { symbol, period: "1mo", interval: "1d" },
      });
      setData(res.data);
    } catch (err) {
      setData([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Market Data</h2>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Symbol"
      />
      <button onClick={fetchData} disabled={loading}>
        Fetch
      </button>
      <div style={{ maxHeight: 200, overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row["Open time"]}</td>
                <td>{row["Open"]}</td>
                <td>{row["High"]}</td>
                <td>{row["Low"]}</td>
                <td>{row["Close"]}</td>
                <td>{row["Volume"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketData;