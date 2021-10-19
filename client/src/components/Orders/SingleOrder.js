import React from "react";

const SingleOrder = ({ load }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "3px",
        margin: "5px 0",
        padding: "5px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          fontSize: 14,
          width: "40%",
          wordBreak: "break-word",
          paddingRight: "5px",
        }}
      >
        {load.route}
      </p>

      <p style={{ fontSize: 14, color: "red", width: "30%", padding: "0 5px" }}>
        ${load.cost}
      </p>
      <p
        style={{
          fontSize: 14,
          color: "green",
          width: "30%",
          paddingLeft: "5px",
        }}
      >
        ${load.revenue}
      </p>
    </div>
  );
};

export default SingleOrder;
