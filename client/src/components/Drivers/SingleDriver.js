import React from "react";

//components
import Card from "../StyledComponents/Card";
import SingleOrder from "../Orders/SingleOrder";

const SingleDriver = ({ driver }) => {
  const name = `${driver.first_name} ${driver.last_name}`;

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
    target.loads.push(load);
  };

  return (
    <Card
      title={name}
      minHeight={300}
      titleSize={20}
      titleWeight="500"
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleOnDrop(event, driver)}
    >
      <div className="singleDriver">
        {driver && driver.loads && driver.loads.length ? (
          driver.loads.map((load, index) => {
            return (
              <SingleOrder
                key={index}
                load={load}
                handleDragStart={handleDragStart}
                currentTarget={driver}
                assigned={true}
              />
            );
          })
        ) : (
          <p className="singleDriver--empty">No Loads</p>
        )}
      </div>
    </Card>
  );
};

export default SingleDriver;
