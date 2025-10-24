import React from "react";
import { Timer } from "../components/Timer";
import { ActivityList } from "../components/ActivityList";
export const TimeEntryPage = () => {
  return (
    <>
      <div className="relative w-full h-full flex flex-col justify-start text-white">
          <h1 className="mt-8 ml-7 text-white text-4xl font-semibold ">
            Time Tracker
          </h1>

        <Timer />

      </div>
    </>
  );
};
