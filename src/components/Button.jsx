import React from 'react'

  
export default function Button({ isLoading, disabled, onClick, title, type = 'button', className }) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${className}`}
      >
        {isLoading ? 'Loading...' : title}
      </button>
    </>
  );
}
