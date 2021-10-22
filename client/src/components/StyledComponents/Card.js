import React from "react";

const Card = ({
  title,
  children,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  titleSize,
  titleWeight,
  titleColor,
  style,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      style={{
        minWidth: minWidth || "auto",
        maxWidth: maxWidth || "auto",
        minHeight: minHeight || "auto",
        maxHeight: maxHeight || "auto",
        borderRadius: "10px",
        backgroundColor: "white",
        wordBreak: "break-word",
        boxShadow: "1px 3px 15px 0 rgba(0, 0, 0, 0.1)",
        padding: "10px",
        ...style,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <p
        style={{
          fontSize: titleSize || 16,
          fontWeight: titleWeight || "400",
          color: titleColor || "black",
          textTransform: "capitalize",
        }}
      >
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
};

export default Card;
