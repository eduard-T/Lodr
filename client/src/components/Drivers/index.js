import React from "react";

//components
import SingleDriver from "./SingleDriver";
import * as Data from "../MOCK_DATA.json";

const DriversComponent = () => {
  return (
    <div>
      <p style={{ fontSize: 24, fontWeight: "700" }}>Drivers</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "0 40px",
        }}
      >
        {Data &&
          Data.default &&
          Data.default.map((driver) => {
            return <SingleDriver driver={driver} key={driver.id} />;
          })}
      </div>
    </div>
  );
};

export default DriversComponent;
