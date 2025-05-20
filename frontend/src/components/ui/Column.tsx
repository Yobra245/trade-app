import React, { ReactNode } from "react";

type ColumnProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

const Column: React.FC<ColumnProps> = ({ children, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    {children}
  </div>
);

export default Column;