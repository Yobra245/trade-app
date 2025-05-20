import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type Props = {
  setSignal: (signal: string | null) => void;
  setRisk: (risk: string | null) => void;
};

const defaultFeatures = {
  open: 68000,
  close: 68500,
  high: 68900,
  low: 67700,
  volume: 0.5,
  volatility: 0.02,
};

const SignalForm: React.FC<Props> = ({ setSignal, setRisk }) => {
  const [features, setFeatures] = useState(defaultFeatures);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFeatures({ ...features, [e.target.name]: +e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`${API_URL}/signals`, features);
    setSignal(res.data.signal);
    setRisk(res.data.risk);
    setLoading(false);
  };

  return (
    <div>
      <h2>Signal Generator</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(features).map((key) => (
          <div key={key}>
            <label>
              {key}:{" "}
              <input
                type="number"
                name={key}
                value={features[key as keyof typeof features]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button type="submit" disabled={loading}>
          Generate Signal
        </button>
      </form>
    </div>
  );
};

export default SignalForm;