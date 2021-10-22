const express = require("express");
const cors = require("cors");
const { orders, drivers } = require("./database");

const PORT = process.env.PORT || 3001;

const api = express();

//middleware
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());

api.get("/api", cors(), async (request, response) => {
  response.status(200).json({ orders, drivers });
});

api.post("/api/orders/new-order", cors(), async (request, response) => {
  let { input } = request.body;
  orders.push(input);
  response.status(200).end();
});

api.put("/api/orders/update-order", cors(), (request, response) => {
  let { order, input } = request.body;

  let matchedOrder = orders.find((item) => item.id === order.id);

  matchedOrder = { ...matchedOrder, ...input };

  let index = orders
    .map((order) => {
      return order.id;
    })
    .indexOf(matchedOrder.id);

  orders.splice(index, 1);
  orders.push(matchedOrder);
  response.status(200).end();
});

api.post("/api/drivers/new-driver", cors(), async (request, response) => {
  let { input } = request.body;
  drivers.push(input);
  response.status(200).end();
});

api.put("/api/orders/move", cors(), async (request, response) => {
  let { order, current, target } = request.body;

  const findDriver = (location) => {
    let result = drivers.find(
      (driver) => driver.driverID === location.driverID
    );

    return result;
  };

  const removeOrder = (current, value) => {
    let index = current
      .map((order) => {
        return order.id;
      })
      .indexOf(value.id);

    current.splice(index, 1);
  };

  if (current && current.driverID) {
    let driver = findDriver(current);
    removeOrder(driver.loads, order);
  } else {
    removeOrder(orders, order);
  }

  if (target && target.driverID) {
    let driver = findDriver(target);
    driver.loads.push(order);
  } else {
    orders.push(order);
  }

  response.status(200).end();
});

api.delete("/api/orders/remove-order", cors(), async (request, response) => {
  let { order, target } = request.body;

  const findDriver = () => {
    let result = drivers.find((driver) => driver.driverID === target.driverID);

    return result;
  };

  const removeOrder = (value) => {
    let index = target.loads
      .map((order) => {
        return order.id;
      })
      .indexOf(value.id);

    driver.loads.splice(index, 1);
  };

  let driver = findDriver();
  removeOrder(driver.loads, order);

  response.status(200).end();
});

api.listen(PORT, () => {
  console.log(`API running at PORT: ${PORT}`);
});
