import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const DriverInput = ({ updateInput, input }) => {
  return (
    <>
      <TextInput
        name="first_name"
        placeholder="First Name"
        value={input.first_name}
        borderType="none"
        width={"50%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="last_name"
        placeholder="Last Name"
        value={input.last_name}
        borderType="none"
        width={"50%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default DriverInput;
