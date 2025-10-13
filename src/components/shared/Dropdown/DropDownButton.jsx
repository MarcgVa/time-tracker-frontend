import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const DropDownButton = ({children,isOpen,toggle}) => {
  return (
    <div
      onClick={toggle}
      className={`inline-flex justify-center items-center w-fit px-1 py-1 text-xs font-medium text-gray-300 bg-gray-950 rounded-md hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${
        isOpen ? "rounded-bl-none" : ""
      }`}
    >
      {children}
    </div>
  );
}
