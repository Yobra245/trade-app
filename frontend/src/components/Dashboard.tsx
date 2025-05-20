import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./ui/Card";
import Row from "./ui/Row";
import Stat from "./ui/Stat";
import Loader from "./ui/Loader";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Dashboard: React.FC = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarketData();
    // eslint-disable-next-line
  }, []);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/market-data`, {
        params: { symbol, period: "1mo", interval: "1d" },
      });
      setData(res.data);
      if (res.data && res.data.length > 0) {
        const last = res.data[res.data.length - 1];
        setStats({
          close: last.Close,
          high: Math.max(...res.data.map((d: any) => d.High)),
          low: Math.min(...res.data.map((d: any) => d.Low)),
          volume: last.Volume,
        });
      }
    } catch (e) {
      setData([]);
      setStats({});
    }
    setLoading(false);
  };

  return (
    <div>
      <Card>
        <Row style={{ justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchMarketData();
            }}
          >
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Symbol"
              style={{ marginRight: 8 }}
            />
            <button type="submit">Fetch</button>
          </form>
        </Row>
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <div>
            <Row style={{ justifyContent: "space-around", marginBottom: 24 }}>
              <Stat label="Current Close" value={stats.close ?? "-"} />
              <Stat label="1mo High" value={stats.high ?? "-"} color="green" />
              <Stat label="1mo Low" value={stats.low ?? "-"} color="red" />
              <Stat label="Volume" value={stats.volume ?? "-"} />
            </Row>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="Open time" tickFormatter={(v) => String(v).slice(5, 10)} />
                <YAxis dataKey="Close" domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Close"
                  stroke="#0081ff"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="High"
                  stroke="#00d97e"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Low"
                  stroke="#f44336"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div>No data.</div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;