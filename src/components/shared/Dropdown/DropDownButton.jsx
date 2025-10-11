import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const DropDownButton = ({children,isOpen,toggle}) => {
  return (
    <div
      onClick={toggle}
      className={`inline-flex justify-center items-center w-fit px-1 py-1 text-xs font-medium text-gray-200 bg-gray-950 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer ${
        isOpen ? "rounded-bl-none" : ""
      }`}
    >
      {children}
      <span className="inline-flex items-center toggle-icon">
        {/* {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} className="ml-2" />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
        )} */}
      </span>
    </div>
  );
}
