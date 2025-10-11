import React from 'react'

export const DropdownContent = ({children,isOpen}) => {
  return (
    <div className={`absolute right-0 min-w-fit text-xs px-1 flex flex-col bg-white max-h-[40vh] scroll-m-0 overflow-y-scroll overflow-style scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-lg shadow-lg z-10 ${isOpen ? 'opacity-100 shadow-md shadow-gray-600  rounded-t-none' : 'opacity-0 '}`}>
      {children}
    </div>
  )
}
