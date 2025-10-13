import React from 'react'

export const DropdownItem = ({children, onClick}) => {
  return (
    <div className='dropdown-items p-1 m-1 w-full rounded-lg cursor-pointer hover:text-blue-400' onClick={onClick}>{children}</div>
  )
}
