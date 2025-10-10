import React from 'react'

  
export default function Button({disabled, onClick, title, type = 'button', className, icon,tooltip }) {
  return (
    <>
      <button
        tooltip={tooltip}
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
