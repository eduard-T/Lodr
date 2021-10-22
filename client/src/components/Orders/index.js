import React, { useState } from "react";
import axios from "axios";

//components
import Card from "../StyledComponents/Card";
import Button from "../StyledComponents/Button";
import OrderInput from "./OrderInput";
import SingleOrder from "./SingleOrder";

const OrdersComponent = ({ data, updateOrders }) => {
  const [input, setInput] = useState({});

  const updateInput = (key, value) => {
    let tempInput = { ...input };
    tempInput[key] = value;
    setInput(tempInput);
  };

  const createOrder = async () => {
    if (input) {
      try {
        await axios.post("/api/orders/new-order", {
          input,
        });
      } catch (error) {
        console.log(error);
      }

      mutate("add", input);
    }
  };

  //function to mutate the data based on the action
  const mutate = (action, value) => {
    let currentOrders = [...data];

    if (action === "add") {
      currentOrders.push(value);
      updateOrders(currentOrders);
    }

    if (action === "remove") {
      let index = currentOrders
        .map((load) => {
          return load.id;
        })
        .indexOf(value.id);

      setTimeout(() => {
        currentOrders.splice(index, 1);
        updateOrders(currentOrders);
      }, 1); // Added a timeout of 1ms to offset last item from disappearing on drag start
    }
  };

  const handleDragStart = (event, obj, current) => {
    event.dataTransfer.setData("order", JSON.stringify(obj));
    event.dataTransfer.setData("current", JSON.stringify(current));

    mutate("remove", obj);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = async (event, target) => {
    let order = JSON.parse(event.dataTransfer.getData("order"));
    let current = JSON.parse(event.dataTransfer.getData("current"));

    mutate("add", order);

    try {
      await axios.put("/api/orders/move", {
        order,
        current,
        target,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      style={{ margin: "50px 0" }}
      title="Create an Order"
      minHeight={155}
      titleSize={24}
      titleWeight="700"
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleOnDrop(event, data)}
    >
      <div className="orders__input">
        <OrderInput updateInput={updateInput} />
      </div>
      <div className="orders__input--button">
        <Button title="Create Order" onClick={createOrder} />
      </div>
      <>
        <header className="orders__list--header">
          <p className="orders__list--title">Unassigned Orders</p>
          <p className="orders__list--description">
            // Drag to assign or Drop here to unassign
          </p>
        </header>

        {data &&
          !!data.length &&
          data.map((order, index) => {
            return (
              <SingleOrder
                key={index}
                order={order}
                handleDragStart={handleDragStart}
                driver={null}
              />
            );
          })}
      </>
    </Card>
  );
};

export default OrdersComponent;
