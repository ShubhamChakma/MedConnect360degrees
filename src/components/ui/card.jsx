// File: client/src/components/ui/card.jsx
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-800 text-sm">{children}</div>;
};

export default Card;
