import React, { useState } from 'react'
import axios from 'axios'

export default function Backtest() {
  const [result, setResult] = useState<any>(null)
  const run = () =>
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/ml/predict`, { symbol: 'BTC' })
      .then(res => setResult(res.data))

  return (
    <div className="container">
      <h1>Backtest</h1>
      <button onClick={run}>Run Prediction</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
