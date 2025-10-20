import React, {useEffect, useState} from "react";
import Button from "../../Shared/components/Button";
import { useStartTimerMutation, useStopTimerMutation } from "../../Shared/routes/timeEntriesApi";
import {useGetProjectQuery, useGetProjectsQuery } from '../../Projects/routes/projectsApi'

export const Timer = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false);
  const [projects, setProjects] = useState({})
  const [projId, setProjId] = useState({});
  const [task, setTask] = useState('');
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const { status, data } = useGetProjectsQuery();
  //const { status: projStatus, data: projData } = useGetProjectQuery(id);


  const projectDropDownList = () => {
    
  };


  const formatTime = (milliseconds) => {
    const centiseconds = Math.floor((milliseconds / 10) % 100);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((seconds / 60) % 60);
    const hours = Math.floor((minutes / 60) % 60);
    return (
      `${String(hours).padStart(2,'0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}:` +
      `${String(centiseconds).padStart(2, '0')}`
    );
  }

  const handleStart = async () => {
    setIsRunning(true);
    // e.preventDefault();

    // const payload = {
    //   projectId: projectId,
    //   notes: notes,
    // };
    // try {
    //   const entry = await startTimerApi(payload).unwrap();
    //   console.log("entry", entry);
    //   setNotes("");
    // } catch (err) {
    //   console.error(err);
    // }
  };


  async function handleStop() {
    setIsRunning(false);
    //  await stopTimer(entryId).unwrap();
    //  setEntryId(null);
   }

  
  useEffect(() => {
    let interval = null;
    if (isRunning) { 

      interval = setInterval(() => {
        setTime(prevTime => prevTime += 10);
      }, 10);
    } else { 

      clearInterval(interval);
    }
    return () => clearInterval(interval);
    
  },[isRunning])

  useEffect(() => {
    if (status === 'fulfilled') {
      setProjects(data);
    }
  },[status,projects])

  return (
    <div className="w-lg">
      <div className="flex justify-between">
        <div
          className="flex p-3 text-center tracking-tight font-semibold
                   size-40 justify-center items-center text-2xl  
                        border-6 border-gray-500 rounded-full 
                        "
        >
          <h1>{formatTime(time)}</h1>
        </div>
        <div className="flex items-start ">
          <Button
            title={isRunning ? "Stop" : "Start"}
            className={`px-12 py-2 rounded-2xl ${
              isRunning ? "bg-red-950" : "bg-blue-500"
            }`}
            onClick={isRunning ? handleStop : handleStart}
          />
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};
;