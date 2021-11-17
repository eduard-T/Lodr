import React, { useState, useEffect } from "react";
import axios from "axios";

//components
import Card from "../StyledComponents/Card";
import SingleOrder from "../Orders/SingleOrder";

const SingleDriver = ({ driver }) => {
  // initialize states
  const [loads, setLoads] = useState([]);

  // concat the first and last names, assign it to the name variable
  const name = `${driver.first_name} ${driver.last_name}`;

  // on load, set state if data exists
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
          return load.order_id;
        })
        .indexOf(value.order_id);

      setTimeout(() => {
        currentLoads.splice(index, 1);
        setLoads(currentLoads);
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
      console.log(`Move Driver Order Error:`, error);
    }
  };

  // ================== DRAG HANDLERS END ================== //

  return (
    <Card
      title={name}
      minHeight={300}
      titleSize={20}
      titleWeight="500"
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleOnDrop(event, driver)}
      onDragEnter={(event) => handleDragEnter(event)}
      onDragLeave={(event) => handleDragLeave(event)}
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
