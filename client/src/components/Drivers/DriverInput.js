import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const DriverInput = ({ updateInput, input }) => {
  return (
    <>
      <TextInput
        name="firstName"
        placeholder="First Name"
        value={input.firstName}
        borderType="none"
        width={"50%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="lastName"
        placeholder="Last Name"
        value={input.lastName}
        borderType="none"
        width={"50%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default DriverInput;
