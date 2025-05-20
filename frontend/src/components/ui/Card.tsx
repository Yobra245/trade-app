import React, { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  style?: React.CSSProperties;
};

const Card: React.FC<CardProps> = ({ title, children, style }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      padding: 20,
      marginBottom: 24,
      ...style,
    }}
  >
    {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
    <div>{children}</div>
  </div>
);

export default Card;