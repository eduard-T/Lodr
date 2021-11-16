import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//components
import Button from "../StyledComponents/Button";
import DriverInput from "./DriverInput";
import SingleDriver from "./SingleDriver";

const DriversComponent = ({ data, updateDrivers }) => {
  // initialize states
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    loads: [],
  });
  const [errorMsg, setErrorMsg] = useState("");

  // assign a random ID to the driverID variable
  let driver_id = uuidv4();

  // dynamically add key value pairs to the input object
  const updateInput = (key, value) => {
    // include the generated driverID
    let tempInput = { driver_id, ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  // reset input object and stop editing
  const clearInput = () => {
    setInput({
      first_name: "",
      last_name: "",
      loads: [],
    });
    setErrorMsg("");
    setEditing(false);
  };

  // verify the supplied values and return a boolean
  const verify = () => {
    if (!input.first_name && !input.last_name) {
      setErrorMsg("Please fill in all fields!");
      return false;
    }
    if (
      !input.first_name.match(/^[a-zA-Z ]{2,30}$/) ||
      !input.last_name.match(/^[a-zA-Z ]{2,30}$/)
    ) {
      setErrorMsg("Please enter a valid name!");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  // create a driver and update the driver array
  const addDriver = async () => {
    // if all values are verified, send POST request
    if (verify()) {
      try {
        await axios.post("/api/drivers/new-driver", {
          input,
        });
      } catch (error) {
        console.log(`Add Driver Error:`, error);
      }

      // update states
      let currentDrivers = [...data];
      currentDrivers.push(input);
      updateDrivers(currentDrivers);
      clearInput();
    }
  };

  return (
    <section className="drivers">
      <header className="drivers__header">
        <p className="drivers__header--title">Drivers</p>

        {editing ? (
          <>
            {!!errorMsg && <p className="error">{errorMsg}</p>}

            <div className="drivers__inputContainer">
              <div className="drivers__input">
                <DriverInput updateInput={updateInput} input={input} />
              </div>
              <div className="drivers__buttonContainer">
                <Button title="Save" onClick={addDriver} />
                <Button title="Cancel" onClick={clearInput} />
              </div>
            </div>
          </>
        ) : (
          <Button title="Add Driver" onClick={() => setEditing(true)} />
        )}
      </header>

      <div className="drivers__layout">
        {data &&
          !!data.length &&
          data.map((driver) => {
            return <SingleDriver driver={driver} key={driver.driver_id} />;
          })}
      </div>
    </section>
  );
};

export default DriversComponent;
