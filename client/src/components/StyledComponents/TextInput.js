import React from "react";

const TextInput = ({
  onChange,
  placeholder,
  name,
  value,
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
          borderStyle: borderType || "solid",
          borderWidth: borderWidth,
          ...style,
        }}
        type="text"
        name={name}
        id={id || name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
