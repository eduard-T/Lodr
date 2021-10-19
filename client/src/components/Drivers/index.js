import React from "react";

//components
import SingleDriver from "./SingleDriver";
import * as Data from "../MOCK_DATA.json";

const DriversComponent = () => {
  console.log(`Data`, Data);
  return (
    <div>
      <p style={{ fontSize: 24, fontWeight: "700" }}>Drivers</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
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
