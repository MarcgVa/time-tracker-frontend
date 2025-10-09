import React from 'react'

  
export default function Button({disabled, onClick, title, type = 'button', className, icon }) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        {icon}{title}
      </button>
    </>
  );
}
