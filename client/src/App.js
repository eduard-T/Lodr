import React, { useState, useEffect } from "react";
import "./styles.css";

//components
import OrdersComponent from "./components/Orders";
import DriversComponent from "./components/Drivers";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  console.log(`data`, data);

  return (
    <div className="App">
      <header>
        <h1 className="header__title">Driver Manager</h1>
      </header>
      <main className="wrapper">
        <OrdersComponent />
        <DriversComponent />
      </main>
    </div>
  );
};

export default App;
