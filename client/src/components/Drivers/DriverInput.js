import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const DriverInput = ({ updateInput }) => {
  return (
    <>
      <TextInput
        name="firstName"
        placeholder="First Name"
        borderType="none"
        width={"35%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="lastName"
        placeholder="Last Name"
        borderType="none"
        width={"35%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="licenseType"
        placeholder="License Type"
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default DriverInput;
