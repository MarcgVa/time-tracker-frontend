import React, { useState } from "react";

export const Tooltip = ({text, children}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="inline-block relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};
