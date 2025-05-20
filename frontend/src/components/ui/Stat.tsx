import React from "react";

type StatProps = {
  label: string;
  value: string | number;
  color?: string;
};

const Stat: React.FC<StatProps> = ({ label, value, color }) => (
  <div style={{ textAlign: "center", margin: "0 16px" }}>
    <div
      style={{
        fontSize: 28,
        fontWeight: "bold",
        color: color || "#333",
      }}
    >
      {value}
    </div>
    <div style={{ color: "#888", fontSize: 14 }}>{label}</div>
  </div>
);

export default Stat;