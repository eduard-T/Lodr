import React, { useState } from "react";

//components
import OrderInput from "./OrderInput";

const SingleOrder = ({ load, handleDragStart, currentDriver }) => {
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const updateLoad = () => {
    console.log("Saved");
  };

  return (
    <div
      draggable={editing ? false : true}
      onDragStart={(event) => handleDragStart(event, load, currentDriver)}
      onMouseDown={(event) => {
        if (!editing) {
          event.target.style.cursor = "grabbing";
        }
      }}
      onMouseUp={(event) => {
        if (!editing) {
          event.target.style.cursor = "grab";
        }
      }}
      style={{
        border: "1px solid black",
        borderRadius: "3px",
        margin: "5px 0",
        padding: editing ? 0 : "10px",
        display: "flex",
        justifyContent: "space-between",
        cursor: "grab",
      }}
    >
      {editing ? (
        <OrderInput />
      ) : (
        <>
          <img
            style={{
              width: "15px",
              height: "16px",
              marginRight: "10px",
              display: "flex",
              alignSelf: "center",
              opacity: 0.5,
            }}
            src="/drag-icon.png"
            alt="Drag Icon"
          />
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

          <p
            style={{
              fontSize: 14,
              color: "red",
              width: "30%",
              padding: "0 5px",
            }}
          >
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
        </>
      )}
    </div>
  );
};

export default SingleOrder;
