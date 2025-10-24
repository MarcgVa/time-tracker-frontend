import React, { useState, useEffect, useRef } from "react";
import Button from "../../Shared/components/Button";
import {
  useStartTimerMutation,
  useStopTimerMutation,
} from "../routes/timeEntriesApi";

export const Stopwatch = () => {
  const [time, setTime] = useState(
    Number(sessionStorage.getItem("time"))
  );
  const [isRunning, setIsRunning] = useState(
    JSON.parse(sessionStorage.getItem("isRunning"))
  );
  const [selectedProject, setSelectedProject] = useState(sessionStorage.getItem('cp'));
  
  const [startTimerApi] = useStartTimerMutation();
  const [stopTimerApi] = useStopTimerMutation();
  const taskId = useRef();

  useEffect(() => {
    if (!sessionStorage.getItem("time")) {
      sessionStorage.setItem("time", "0");
    }

    if (!sessionStorage.getItem("isRunning")) {
      sessionStorage.setItem("isRunning", false);
    }
  }, []);
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    sessionStorage.setItem("time", JSON.stringify(time));
  }, [time]);

  const formatTime = (milliseconds) => {
    // console.log('ms', milliseconds);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    // console.log('s',seconds);
    const minutes = Math.floor((milliseconds / 60000) % 60);
    // console.log('min', minutes);
    const hours = Math.floor((milliseconds / 3600000) % 24);
    // console.log('h', hours);

    return (
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`
    );
  };

  const handleStart = async () => {
    setIsRunning(true);
    sessionStorage.setItem("isRunning", true);
    const formData = {
      projectId: selectedProject.current,
      notes: task,
    };
    console.log("formData", formData);

    const response = await startTimerApi(formData).unwrap();
    if (response) {
      taskId.current = response.id;
    }
  };

  const handleStop = async ({projectId}) => {
    setIsRunning(false);
    sessionStorage.setItem("isRunning", false);
    setTime(0);
    // await stopTimerApi(taskId.current).unwrap();
  };

  return (
    <div className="border border-teal-200">
      <div className="flex mt-6 justify-evenly items-center gap-5 ">
        <div className="flex text-center tracking-tight font-light text-4xl size-45 justify-center items-center   
                            border-3 border-gray-500/50 rounded-full 
                            "
        >
          <h1>{formatTime(time)}</h1>
        </div>
        <div className="flex">
          <button
            className={`px-15 py-2 rounded-2xl text-2xl font-light tracking-wider disabled:bg-gray-500 ${
              isRunning ? "bg-red-900" : "bg-blue-500"
            }`}
            onClick={isRunning ? handleStop : handleStart}
            disabled={selectedProject !== 'undefined' ? false : true}
            >
            {isRunning ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};
