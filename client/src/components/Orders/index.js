import React, { useState, useEffect } from "react";

//components
import Card from "../StyledComponents/Card";
import Button from "../StyledComponents/Button";
import OrderInput from "./OrderInput";
import SingleOrder from "./SingleOrder";

const OrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState({});

  const updateInput = (key, value) => {
    let tempInput = { ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  const handleDragStart = (event, obj, current) => {
    console.log(obj);
    event.dataTransfer.setData("load", JSON.stringify(obj));
    console.log(current);
    //create logic to splice the load from the current array and add it to the dropped array
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (event, target) => {
    let load = JSON.parse(event.dataTransfer.getData("load"));
    console.log(load);
    console.log(target);
    target.push(load);
  };

  let tempLoad = {
    route: "Your Location to My Location",
    cost: "987.37",
    revenue: "1078.22",
  };

  useEffect(() => {
    let temp = [...orders];

    temp.push(tempLoad);
    setOrders(temp);
  }, []);

  return (
    <Card
      style={{ margin: "50px 0" }}
      title="Create an Order"
      minHeight={155}
      titleSize={24}
      titleWeight="700"
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleOnDrop(event, orders)}
    >
      <div className="orders__input">
        <OrderInput updateInput={updateInput} />
      </div>
      <div className="orders__input--button">
        <Button title="Create Order" onClick={() => console.log("Clicked")} />
      </div>
      {orders && !!orders.length && (
        <>
          <header className="orders__list--header">
            <p className="orders__list--title">Unassigned Orders</p>
            <p className="orders__list--description">
              // Drag and drop to assign
            </p>
          </header>

          {orders.map((load, index) => {
            return (
              <SingleOrder
                key={index}
                load={load}
                handleDragStart={handleDragStart}
                currentTarget={orders}
              />
            );
          })}
        </>
      )}
    </Card>
  );
};

export default OrdersComponent;
