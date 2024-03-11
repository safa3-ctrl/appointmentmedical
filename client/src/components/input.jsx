import React from "react";

const Input = ({ type, name, id, placeholder, value, onChange, required }) => {
  return (
    <input
      className={`
         border  p-4 rounded-md w-full focus:outline-none mt-[12px] 
      `}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
