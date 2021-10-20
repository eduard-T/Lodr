import React from "react";

//components
import Card from "../StyledComponents/Card";
import SingleOrder from "../Orders/SingleOrder";

const SingleDriver = ({ driver }) => {
  const name = `${driver.first_name} ${driver.last_name}`;

  const handleDragStart = (event, obj, current) => {
    event.dataTransfer.effectAllowed = "move";
    console.log(obj);
    event.dataTransfer.setData("load", JSON.stringify(obj));
    console.log(current);
    //create logic to splice the load from the current array and add it to the dropped array
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (event, driver) => {
    event.dataTransfer.dropEffect = "move";
    let load = JSON.parse(event.dataTransfer.getData("load"));
    console.log(load);
    console.log(driver);
    driver.loads.push(load);
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
      <div style={{ marginTop: "20px" }}>
        {driver && driver.loads && driver.loads.length ? (
          driver.loads.map((load, index) => {
            return (
              <SingleOrder
                load={load}
                handleDragStart={handleDragStart}
                currentDriver={driver}
                key={index}
              />
            );
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "grey",
              fontSize: 16,
              padding: "100px 20px",
            }}
          >
            No Loads
          </p>
        )}
      </div>
    </Card>
  );
};

export default SingleDriver;
