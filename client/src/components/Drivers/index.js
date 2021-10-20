import React, { useState } from "react";

//components
import Button from "../StyledComponents/Button";
import DriverInput from "./DriverInput";
import SingleDriver from "./SingleDriver";
import * as Data from "../MOCK_DATA.json";

const DriversComponent = () => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState({});

  const updateInput = (key, value) => {
    let tempInput = { ...input };

    tempInput[key] = value;
    setInput(tempInput);
  };

  const addDriver = () => {
    console.log(input);
    setEditing(false);
  };

  return (
    <main className="drivers">
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
          <DriverInput updateInput={updateInput} />
        </div>
      )}
      <div className="drivers__layout">
        {Data &&
          Data.default &&
          Data.default.map((driver) => {
            return <SingleDriver driver={driver} key={driver.id} />;
          })}
      </div>
    </main>
  );
};

export default DriversComponent;
