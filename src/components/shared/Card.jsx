import React from "react";


export const Card = ({title,description,hourlyRate,action,children}) => {
  return (
    <div className="relative bg-gray-400 p-4 min-w-sm border border-gray-900 border-shadow shadow-xl rounded-lg">
      <div className="flex flex-col">
        <div className="absolute top-0 left-0 right-0 rounded-t-sm text-gray-900 bg-gray-900">
          <h3 className="text-gray-400 text-center text-sm py-1">{title}</h3>
        </div>
        <div className="mt-3 px-2 text-left text-wrap max-w-xs">
          <p>{description}</p>
        </div>
        <div className="flex text-xs justify-between">
          <div className="">
            ${hourlyRate}
          </div>
          <div className="absolute bottom-1 right-1 flex flex-row items-end gap-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}