import React, { ReactNode } from "react";

type RowProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

const Row: React.FC<RowProps> = ({ children, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export default Row;