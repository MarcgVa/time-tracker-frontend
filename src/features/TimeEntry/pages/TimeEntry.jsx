import React, { useState } from "react";
import { StartTimeEntry } from "../../Projects/components/StartTImeEntry";
import Button from "../../Shared/components/Button";
import { Timer } from "../components/Timer";

export const TimeEntry = () => {
  const [start, setStart] = useState(false);
  return (
    <div className="relative w-full h-full flex flex-col justify-start text-white">
      <div>
        <h1 className="mt-2 ml-2 text-white text-4xl font-bold tracking-widest ">
          Time Tracker
        </h1>
      </div>
      <div className="mt-6 ml-6 flex ">
        <div><Timer/></div>
        <div className="flex flex-col justify-end">
          
          <div className="flex">
            Project and Task Area

          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
