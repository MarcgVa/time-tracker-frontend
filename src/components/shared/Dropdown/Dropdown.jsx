import React, { useState } from "react";
import { DropDownButton } from "./DropDownButton";
import { DropdownContent } from "./DropdownContent";

export const Dropdown = ({ buttonText, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative inline-block text-center ">
      <DropDownButton isOpen={isOpen} toggle={handleToggleDropdown}>{buttonText}</DropDownButton>
      <DropdownContent isOpen={isOpen}>{content}</DropdownContent>
    </div>
  );
};
