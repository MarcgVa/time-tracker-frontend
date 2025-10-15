import React from "react";
import logo from "../assets/img/under_construction.svg";

export const UnderConstruction = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 top-0 left-0 right-0 bottom-0 w-full h-full">
      <div className="w-1/2 m-auto">
        <img
          src={logo}
          alt="under construction"
          className="size-300 flex justify-center item-center m-auto mt-10"
        />
      </div>
    </div>
  );
};
