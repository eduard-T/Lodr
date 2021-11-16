const express = require("express");
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.PORT || 3001;

const api = express();

//middleware
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());

if (process.env.NODE_ENV === "production") {
  api.use(express.static(path.join(__dirname, "client/build")));
}

// === SEND ALL DATA FROM ORDERS
api.get("/api/orders", cors(), async (request, response) => {
  try {
    const allOrders = await pool.query("SELECT * FROM orders");
    response.status(200).json(allOrders.rows);
  } catch (error) {
    response
      .status(400)
      .statusMessage("Order query error:", error.message)
      .end();
  }
});

// === SEND ALL DATA FROM DRIVERS
api.get("/api/drivers", cors(), async (request, response) => {
  try {
    const allDrivers = await pool.query(
      "SELECT * FROM drivers ORDER BY last_name"
    );
    response.status(200).json(allDrivers.rows);
  } catch (error) {
    response
      .status(400)
      .statusMessage("Driver query error:", error.message)
      .end();
  }
});

// === ADD A NEW ORDER
api.post("/api/orders/new-order", cors(), async (request, response) => {
  let { order } = request.body;

  // insert the object into the orders table
  const newOrder = await pool.query(
    "INSERT INTO orders(order_id, description, cost, revenue) VALUES ($1, $2, $3, $4) RETURNING *",
    [order.order_id, order.description, order.cost, order.revenue]
  );
  response.status(200).json(newOrder.rows[0]).end();
});

// === UPDATE AN ORDER
api.put("/api/orders/update-order", cors(), async (request, response) => {
  let { order, input } = request.body;

  //find and update the order by order id
  await pool.query(
    "UPDATE orders SET description = $2, cost = $3, revenue = $4  WHERE order_id = $1 RETURNING *",
    [order.order_id, input.description, input.cost, input.revenue]
  );

  response.status(200).end();
});

// === ADD A NEW DRIVER
api.post("/api/drivers/new-driver", cors(), async (request, response) => {
  let { input } = request.body;

  // insert the object into the drivers table
  const newDriver = await pool.query(
    "INSERT INTO drivers(driver_id, first_name, last_name) VALUES ($1, $2, $3) RETURNING *",
    [input.driver_id, input.first_name, input.last_name]
  );
  response.status(200).end();
});

// === MOVE AN EXISTING ORDER
api.put("/api/orders/move", cors(), async (request, response) => {
  let { order, current, target } = request.body;

  // if the order is in a driver object find the driver and remove the order
  if (current && current.driver_id) {
    await pool.query(
      "UPDATE drivers SET loads = array_remove(loads, $2) WHERE driver_id = $1 RETURNING *",
      [current.driver_id, order]
    );
  } else {
    // if not, remove the order from the orders table
    pool.query("DELETE FROM orders WHERE order_id = $1 RETURNING *", [
      order.order_id,
    ]);
  }

  // if the target is a driver object find the driver and add the order
  if (target && target.driver_id) {
    await pool.query(
      "UPDATE drivers SET loads = loads || $2 WHERE driver_id = $1 RETURNING *",
      [target.driver_id, [order]]
    );
  } else {
    // if not, add it to the orders array
    pool.query(
      "INSERT INTO orders(order_id, description, cost, revenue) VALUES ($1, $2, $3, $4) RETURNING *",
      [order.order_id, order.description, order.cost, order.revenue]
    );
  }

  response.status(200).end();
});

// === DELETE AN ORDER
api.delete("/api/orders/remove-order", cors(), async (request, response) => {
  let { order, target } = request.body;

  //find and remove the requested order from the target driver
  await pool.query(
    "UPDATE drivers SET loads = array_remove(loads, $2) WHERE driver_id = $1 RETURNING *",
    [target.driver_id, order]
  );

  response.status(200).end();
});

//catch all function to redirect to the homepage if the path does not exist
api.get("*", cors(), (request, response) => {
  response.sendFile(path.join(__dirname, "client/build/index.html"));
});

// listen for API at the given port
api.listen(PORT, () => {
  console.log(`API running at PORT: ${PORT}`);
});
