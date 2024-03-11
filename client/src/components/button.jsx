
import React from "react";
const Button = ({ type, children }) => {
  return (
    <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  font-bold rounded-lg text-[16px] px-4  text-center mr-2 mb-2  shadow  outline-none   py-3"
    
    type={type}
    >
      {children}
    </button>
  );
};

export default Button;
