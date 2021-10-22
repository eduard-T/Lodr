import React, { useState, useEffect } from "react";
import axios from "axios";

//components
import Card from "../StyledComponents/Card";
import SingleOrder from "../Orders/SingleOrder";

const SingleDriver = ({ driver }) => {
  const [loads, setLoads] = useState();
  const name = `${driver.firstName} ${driver.lastName}`;

  useEffect(() => {
    if (driver && !!driver.loads) {
      setLoads(driver.loads);
    }
  }, [driver]);

  //function to mutate the data based on the action
  const mutate = (action, value) => {
    let currentLoads = [...loads];

    if (action === "add") {
      currentLoads.push(value);
      setLoads(currentLoads);
    }

    if (action === "remove") {
      let index = currentLoads
        .map((load) => {
          return load.id;
        })
        .indexOf(value.id);

      setTimeout(() => {
        currentLoads.splice(index, 1);
        setLoads(currentLoads);
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
      console.log(`Move Driver Order Error:`, error);
    }
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
        {loads && !!loads.length ? (
          loads.map((order, index) => {
            return (
              <SingleOrder
                key={index}
                order={order}
                handleDragStart={handleDragStart}
                mutate={mutate}
                driver={driver}
              />
            );
          })
        ) : (
          <p className="singleDriver--empty">No Orders</p>
        )}
      </div>
    </Card>
  );
};

export default SingleDriver;
