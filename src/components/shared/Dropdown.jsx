import React, { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const Dropdown = ({ title, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={dropdownRef} className="absolute inline-block z-100">
      <button {...props} onClick={toggleDropdown}>
        {title}
      </button>
      {isOpen && (
        <div className="absolute top-5 right-1/2 border border-gray-300 p-2 bg-white z-100">
          {props.children}
        </div>
      )}
    </div>
  );
};
