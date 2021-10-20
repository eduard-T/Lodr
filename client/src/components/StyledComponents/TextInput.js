import React from "react";

const TextInput = ({
  onBlur,
  placeholder,
  name,
  id,
  width,
  borderWidth,
  borderType,
  style,
}) => {
  return (
    <div style={{ width: width || "100%" }}>
      <label className="srOnly" htmlFor={name}>
        {placeholder}
      </label>
      <input
        className="textInput"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "15px",
          borderRadius: "3px",
          borderColor: "grey",
          borderStyle: borderType,
          borderWidth: borderWidth,
          ...style,
        }}
        type="text"
        name={name}
        id={id || name}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextInput;
