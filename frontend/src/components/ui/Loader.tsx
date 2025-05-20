import React from "react";

const Loader: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 80,
    }}
  >
    <div className="loader" />
    <style>{`
      .loader {
        border: 4px solid #eee;
        border-top: 4px solid #0081ff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
);

export default Loader;