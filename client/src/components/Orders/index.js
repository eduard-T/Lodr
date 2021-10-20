import React, { useState } from "react";

//components
import Card from "../StyledComponents/Card";
import Button from "../StyledComponents/Button";
import OrderInput from "./OrderInput";
import SingleOrder from "./SingleOrder";

const OrdersComponent = () => {
  const [input, setInput] = useState({});

  const updateInput = (key, value) => {
    let tempInput = { ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  let load = {
    route: "Your Location to My Location",
    cost: "987.37",
    revenue: "1078.22",
  };
  return (
    <Card
      style={{ margin: "5rem 0" }}
      title="Create an Order"
      minHeight={300}
      titleSize={24}
      titleWeight="700"
    >
      <div
        style={{
          display: "flex",
          border: "2px solid royalblue",
          borderRadius: "3px",
          marginTop: "15px",
        }}
      >
        <OrderInput updateInput={updateInput} />
      </div>
      <div style={{ float: "right", margin: "10px 0 10px 10px" }}>
        <Button title="Create Order" onClick={() => console.log("Clicked")} />
      </div>
      <p
        style={{
          fontSize: 18,
          fontWeight: "500",
          padding: "30px 0 10px",
          wordBreak: "break-word",
        }}
      >
        Unassigned Orders
      </p>
      <SingleOrder load={load} />
    </Card>
  );
};

export default OrdersComponent;
