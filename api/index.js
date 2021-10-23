const express = require("express");
const cors = require("cors");
const { orders, drivers } = require("./database");

const PORT = process.env.PORT || 3001;

const api = express();

//middleware
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());

// === SEND ALL DATA FROM ORDERS AND DRIVERS
api.get("/api", cors(), async (request, response) => {
  response.status(200).json({ orders, drivers });
});

// === ADD A NEW ORDER
api.post("/api/orders/new-order", cors(), async (request, response) => {
  let { order } = request.body;
  // push the object into the orders array
  orders.push(order);
  response.status(200).end();
});

// === UPDATE AN ORDER
api.put("/api/orders/update-order", cors(), (request, response) => {
  let { order, input } = request.body;

  // find the received order with the order in the orders array
  let matchedOrder = orders.find((item) => item.id === order.id);

  // spread the input object into the matched order with the existing info
  matchedOrder = { ...matchedOrder, ...input };

  // find the index of the matched order
  let index = orders
    .map((order) => {
      return order.id;
    })
    .indexOf(matchedOrder.id);

  // remove the order from the orders array
  orders.splice(index, 1);

  // push the updated order into the orders array
  orders.push(matchedOrder);
  response.status(200).end();
});

// === ADD A NEW DRIVER
api.post("/api/drivers/new-driver", cors(), async (request, response) => {
  let { input } = request.body;
  // push the object into the drivers array
  drivers.push(input);
  response.status(200).end();
});

// === MOVE AN EXISTING ORDER
api.put("/api/orders/move", cors(), async (request, response) => {
  let { order, current, target } = request.body;

  // function to find the driver based on the location
  const findDriver = (location) => {
    let result = drivers.find(
      (driver) => driver.driverID === location.driverID
    );

    return result;
  };

  // function to remove the order based on the location and order ID
  const removeOrder = (current, value) => {
    let index = current
      .map((order) => {
        return order.id;
      })
      .indexOf(value.id);

    current.splice(index, 1);
  };

  // if the order is in a driver object find the driver and remove the order
  if (current && current.driverID) {
    let driver = findDriver(current);
    removeOrder(driver.loads, order);
  } else {
    // if not, remove the order from the orders array
    removeOrder(orders, order);
  }

  // if the target is a driver object find the driver and add the order
  if (target && target.driverID) {
    let driver = findDriver(target);
    driver.loads.push(order);
  } else {
    // if not, add it to the orders array
    orders.push(order);
  }

  response.status(200).end();
});

// === DELETE AN ORDER
api.delete("/api/orders/remove-order", cors(), async (request, response) => {
  let { order, target } = request.body;

  // function to find the driver in the drivers array
  const findDriver = () => {
    let result = drivers.find((driver) => driver.driverID === target.driverID);

    return result;
  };

  // function to remove the order from the matched driver's loads
  const removeOrder = (value) => {
    let index = target.loads
      .map((order) => {
        return order.id;
      })
      .indexOf(value.id);

    driver.loads.splice(index, 1);
  };

  // find the driver, then remove the order from their loads
  let driver = findDriver();
  removeOrder(driver.loads, order);

  response.status(200).end();
});

// listen for API at the given port
api.listen(PORT, () => {
  console.log(`API running at PORT: ${PORT}`);
});
