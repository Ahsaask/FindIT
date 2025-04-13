// src/components/InputField.jsx

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

export default function InputField({type, name, value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState); // Toggle the password visibility state
  };

  return (
    <div className="mb-2">
      <div className="relative">
        <input
          type={isPasswordVisible && type === "password" ? "text" : type} // Toggle between "text" and "password"
          name={name} // Form field name
          value={value} // Controlled value
          onChange={onChange} // Handle input changes
          className="mt-2 py-3 px-4 shadow-sm rounded-md border w-full"
        />
        {type === "password" && (
          <button
            onClick={handleTogglePasswordVisibility} // Toggle visibility
            className="absolute right-4 top-5 text-2xl cursor-pointer"
          >
            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />} 
            {/* // Fix eye icon logic */}
          </button>
        )}
      </div>
    </div>
  );
}
