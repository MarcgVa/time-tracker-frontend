import React from "react";
import { useNavigate } from "react-router-dom";
export const Card = ({
  title,
  description,
  hourlyRate,
  location,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(location)}
      className="grid-rows-3 bg-zinc-300 min-w-sm max-w-md  max-h-50 border-gray-900 shadow-md shadow-gray-600 rounded-lg m-0.5 mx-6 cursor-pointer relative"
    >
      <div className="rounded-t-sm bg-blue-800">
        <h3 className="text-gray-200 text-center text-sm py-1">{title}</h3>
      </div>
      <div className="mt-3 px-2 text-left text-wrap text-xs max-w-xs">
        <p>{description}</p>
      </div>
      <div>
        <div className="absolute bottom-1 left-2 text-xs font-semibold">
          Hourly Rate: ${hourlyRate}
        </div>
        <div className="absolute bottom-1 right-1 flex flex-row gap-2 text-xs">
          {children}
        </div>
      </div>
    </div>
  );
};
