import React from "react";

//components
import TextInput from "../StyledComponents/TextInput";

const OrderInput = ({ updateInput, load }) => {
  return (
    <>
      <TextInput
        name="route"
        placeholder="Add the route..."
        defaultValue={load && load.route ? load.route : null}
        borderType="none"
        width={"40%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="cost"
        placeholder="Cost of the load..."
        defaultValue={load && load.cost ? load.cost : null}
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
      <TextInput
        name="revenue"
        placeholder="Load revenue..."
        defaultValue={load && load.revenue ? load.revenue : null}
        borderType="none"
        width={"30%"}
        onBlur={(event) => updateInput(event.target.id, event.target.value)}
      />
    </>
  );
};

export default OrderInput;