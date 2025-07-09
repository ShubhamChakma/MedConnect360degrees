// File: client/src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, onClick, variant = "primary" }) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-semibold transition duration-200 focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
