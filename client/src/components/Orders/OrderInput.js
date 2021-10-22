import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const OrderInput = ({ updateInput, input }) => {
  return (
    <>
      <TextInput
        name="description"
        placeholder="Add the Description..."
        value={input.description}
        borderType="none"
        width={"40%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="cost"
        placeholder="Cost of the order..."
        value={input.cost}
        borderType="none"
        width={"30%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="revenue"
        placeholder="Order revenue..."
        value={input.revenue}
        borderType="none"
        width={"30%"}
        onChange={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default OrderInput;
