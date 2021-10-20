import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const OrderInput = ({ updateInput }) => {
  return (
    <>
      <TextInput
        name="route"
        placeholder="Add the route..."
        borderType="none"
        width={"40%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="cost"
        placeholder="Cost of the load..."
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="revenue"
        placeholder="Load revenue..."
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default OrderInput;
