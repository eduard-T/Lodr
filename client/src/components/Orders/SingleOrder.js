import React, { useState } from "react";

//components
import OrderInput from "./OrderInput";
import IconButton from "../StyledComponents/IconButton";

const SingleOrder = ({ load, handleDragStart, currentTarget, assigned }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({});

  const updateInput = (key, value) => {
    let tempInput = { ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  const updateLoad = () => {
    console.log("Saved");
    setEditing(false);
  };

  const handleRemove = () => {
    console.log("Removed");
  };

  return (
    <div
      className="singleOrder"
      draggable={editing ? false : true}
      onDragStart={(event) => handleDragStart(event, load, currentTarget)}
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
        padding: editing ? 0 : "10px",
      }}
    >
      {editing ? (
        <div className="singleOrder__content">
          <OrderInput updateInput={updateInput} load={load} />
          <IconButton
            source="/save-icon.png"
            alt="Save icon"
            onClick={updateLoad}
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

          <p className="singleOrder__content--text route">{load.route}</p>
          <p className="singleOrder__content--text cost">${load.cost}</p>
          <p className="singleOrder__content--text revenue">${load.revenue}</p>

          {!assigned && !editing ? (
            <IconButton
              source="/edit-icon.png"
              alt="Edit icon"
              onClick={() => setEditing(true)}
              right="0"
            />
          ) : (
            <IconButton
              source="/remove-icon.png"
              alt="Remove icon"
              onClick={handleRemove}
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
