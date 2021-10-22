import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//components
import Button from "../StyledComponents/Button";
import DriverInput from "./DriverInput";
import SingleDriver from "./SingleDriver";

const DriversComponent = ({ data, updateDrivers }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    licenseType: "",
    loads: [],
  });
  let driverID = uuidv4();

  const updateInput = (key, value) => {
    let tempInput = { driverID, ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  const addDriver = async () => {
    if (input) {
      try {
        await axios.post("/api/drivers/new-driver", {
          input,
        });
      } catch (error) {
        console.log(`Add Driver Error:`, error);
      }

      let currentDrivers = [...data];
      currentDrivers.push(input);
      updateDrivers(currentDrivers);
      setInput({
        firstName: "",
        lastName: "",
        licenseType: "",
        loads: [],
      });
      setEditing(false);
    }
  };

  return (
    <section className="drivers">
      <header className="drivers__header">
        <p className="drivers__header--title">
          Drivers <span className="drivers__header--accent">//</span>
        </p>

        {editing ? (
          <div className="drivers__input--buttons">
            <Button title="Save" width={"100px"} onClick={addDriver} />
            <Button
              title="Cancel"
              width={"100px"}
              onClick={() => setEditing(false)}
            />
          </div>
        ) : (
          <Button title="Add Driver" onClick={() => setEditing(true)} />
        )}
      </header>
      {editing && (
        <div className="drivers__input">
          <DriverInput updateInput={updateInput} input={input} />
        </div>
      )}
      <div className="drivers__layout">
        {data &&
          !!data.length &&
          data.map((driver) => {
            return <SingleDriver driver={driver} key={driver.driverID} />;
          })}
      </div>
    </section>
  );
};

export default DriversComponent;
