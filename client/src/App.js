import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

//components
import OrdersComponent from "./components/Orders";
import DriversComponent from "./components/Drivers";

const App = () => {
  const [orders, setOrders] = useState();
  const [drivers, setDrivers] = useState();

  useEffect(() => {
    axios.get("/api").then((response) => {
      if (response && response.data) {
        setOrders(response.data.orders);
        setDrivers(response.data.drivers);
      }
    });
  }, []);

  const updateOrders = (value) => {
    setOrders(value);
  };

  const updateDrivers = (value) => {
    setDrivers(value);
  };

  return (
    <div className="App">
      <header>
        <h1 className="header__title">Driver Manager</h1>
      </header>
      <main className="wrapper">
        <OrdersComponent data={orders} updateOrders={updateOrders} />
        <DriversComponent data={drivers} updateDrivers={updateDrivers} />
      </main>
    </div>
  );
};

export default App;
