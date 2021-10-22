import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const OrderInput = ({ updateInput, order }) => {
  return (
    <>
      <TextInput
        name="description"
        placeholder="Add the Description..."
        defaultValue={order && order.description ? order.description : null}
        borderType="none"
        width={"40%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="cost"
        placeholder="Cost of the order..."
        defaultValue={order && order.cost ? order.cost : null}
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="revenue"
        placeholder="Order revenue..."
        defaultValue={order && order.revenue ? order.revenue : null}
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default OrderInput;
