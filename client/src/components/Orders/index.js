import React from "react";

//components
import Card from "../StyledComponents/Card";
import SingleOrder from "./SingleOrder";

const OrdersComponent = () => {
  let load = {
    route: "Ur Mum to My Ass",
    cost: "987.37",
    revenue: "1078.22",
  };
  return (
    <Card
      style={{ margin: "5rem 0" }}
      title="Orders"
      minHeight={300}
      titleSize={24}
      titleWeight="700"
    >
      <div>
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
      </div>
      <p style={{ fontSize: 18, fontWeight: "500", padding: "3rem 0 1rem" }}>
        Unassigned Orders
      </p>
      <SingleOrder load={load} />
    </Card>
  );
};

export default OrdersComponent;
