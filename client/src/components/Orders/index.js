import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//components
import Card from "../StyledComponents/Card";
import Button from "../StyledComponents/Button";
import OrderInput from "./OrderInput";
import SingleOrder from "./SingleOrder";

const OrdersComponent = ({ data, updateOrders }) => {
  // initialize state
  const [input, setInput] = useState({
    description: "",
    cost: "",
    revenue: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // assign a random ID to the id variable
  let id = uuidv4();

  // dynamically add key value pairs to the input object
  const updateInput = (key, value) => {
    //include the generated id
    let tempInput = { id, ...input };
    tempInput[key] = value;
    setInput(tempInput);
  };

  // verify the supplied values and return a boolean
  const verify = (value) => {
    if (!value.description && !value.cost && !value.revenue) {
      setErrorMsg("Please fill in all fields!");
      return false;
    }
    if (
      !value.cost.match(/^\d+(\.\d{2})$/) ||
      !value.revenue.match(/^\d+(\.\d{2})$/)
    ) {
      setErrorMsg("Cost and revenue must be proper values!");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  // create an order and update the orders array
  const createOrder = async () => {
    if (verify(input)) {
      // if all values are verified, send POST request
      try {
        await axios.post("/api/orders/new-order", {
          input,
        });
      } catch (error) {
        console.log(`Create Order Error:`, error);
      }

      // update states
      mutate("add", input);
      setInput({
        description: "",
        cost: "",
        revenue: "",
      });
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

  // ================== DRAG HANDLERS START ================== //

  // handler for drag start event
  const handleDragStart = (event, obj, current) => {
    // send data of the grabbed object and location
    event.dataTransfer.setData("order", JSON.stringify(obj));
    event.dataTransfer.setData("current", JSON.stringify(current));

    // remove the order object once grabbed
    mutate("remove", obj);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("dragOver");
  };

  // handler for drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("dragOver");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("dragOver");
  };

  // handler for drop event
  const handleOnDrop = async (event, target) => {
    event.currentTarget.classList.remove("dragOver");

    // receive data from the grabbed object on start
    let order = JSON.parse(event.dataTransfer.getData("order"));
    let current = JSON.parse(event.dataTransfer.getData("current"));

    // add the order to the target on drop
    mutate("add", order);

    // send PUT request to update the database
    try {
      await axios.put("/api/orders/move", {
        order,
        current,
        target,
      });
    } catch (error) {
      console.log(`Move Order Error:`, error);
    }
  };

  // ================== DRAG HANDLERS END ================== //

  return (
    <Card
      style={{ margin: "50px 0" }}
      title="Create an Order"
      minHeight={155}
      titleSize={24}
      titleWeight="700"
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleOnDrop(event, data)}
      onDragEnter={(event) => handleDragEnter(event)}
      onDragLeave={(event) => handleDragLeave(event)}
    >
      {!!errorMsg && <p className="error">{errorMsg}</p>}
      <div className="orders__input">
        <OrderInput updateInput={updateInput} input={input} />
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
                verify={verify}
                driver={null}
              />
            );
          })}
      </>
    </Card>
  );
};

export default OrdersComponent;
