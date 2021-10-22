import React, { useState, useEffect } from "react";
import axios from "axios";

//components
import OrderInput from "./OrderInput";
import IconButton from "../StyledComponents/IconButton";

const SingleOrder = ({ order, handleDragStart, verify, mutate, driver }) => {
  //initialize states
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({});

  // on load, set state if data exists
  useEffect(() => {
    if (order) {
      setInput(order);
    }
  }, [order]);

  // dynamically add key value pairs to the input object
  const updateInput = (key, value) => {
    let tempInput = { ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  // update an order in the orders array
  const updateOrder = async () => {
    if (verify(input)) {
      // if the values are verified, send a PUT request
      try {
        await axios.put("/api/orders/update-order", {
          order,
          input,
        });
      } catch (error) {
        console.log(`Update Order Error:`, error);
      }

      setEditing(false);
    }
  };

  // remove an order in the targeted driver's loads array
  const removeOrder = async () => {
    let target = driver;

    try {
      await axios.delete("/api/orders/remove-order", {
        data: {
          order,
          target,
        },
      });
    } catch (error) {
      console.log(`Remove Order Error:`, error);
    }

    // remove the order from the driver's loads
    mutate("remove", order);
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <div
      className="singleOrder"
      draggable={editing ? false : true}
      onDragStart={(event) => handleDragStart(event, order, driver)}
      style={{
        padding: editing ? 0 : "10px",
      }}
    >
      {editing ? (
        <div className="singleOrder__content">
          <OrderInput updateInput={updateInput} input={input} />
          <IconButton
            source="/save-icon.png"
            alt="Save icon"
            onClick={updateOrder}
            right="10px"
          />
        </div>
      ) : (
        <div className="singleOrder__content">
          <img
            className="singleOrder__dragIcon"
            draggable={false}
            src="/drag-indicator.png"
            alt="Drag indicator icon"
          />

          <p className="singleOrder__content--text description">
            {input.description}
          </p>
          <p className="singleOrder__content--text cost">${input.cost}</p>
          <p className="singleOrder__content--text revenue">${input.revenue}</p>

          {!driver && !editing ? (
            <IconButton
              source="/edit-icon.png"
              alt="Edit icon"
              onClick={toggleEdit}
              right="0"
            />
          ) : (
            <IconButton
              source="/remove-icon.png"
              alt="Remove icon"
              onClick={removeOrder}
              width="10px"
              height="10px"
              right="0"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SingleOrder;
