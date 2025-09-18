import { useParams } from "react-router-dom";
import {
  useGetTimeEntriesQuery,
  useStartTimerMutation,
  useStopTimerMutation,
} from "../features/timeEntries/timeEntriesApi";
import { useGetProjectQuery } from "../features/projects/projectsApi";
import { useEffect, useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const { status: entryStatus, data: entryData = [], isLoading } = useGetTimeEntriesQuery(id);
  const { status, data } = useGetProjectQuery(id);
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const [project, setProject] = useState();
  const [entries, setEntries] = useState();
  const [notes, setNotes] = useState("no notes");

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      await startTimer({projectId: id, notes: notes })
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpdate = (e) => { 
    setNotes((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleStop(entryId) {
    await stopTimer(entryId);
  }

  useEffect(() => {
    if (status == 'fulfilled') {
      setProject(data);
    }
  }), [status, data];

  useEffect(() => {
    if (entryStatus == 'fulfilled') {
      setEntries(entryData);
    }
  }), [entryStatus, entryData];

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Project: {project?.name}
        </h1>
      </div>
      <div className="flex mx-10 ">
        <form onSubmit={handleStart} >
          <input
            type="text"
            placeholder="Project notes"
            name="notes"
            onChange={handleUpdate}
            className="border rounded px-2"
          />
          <button className="mx-4 border px-5 rounded-2xl bg-green-600 text-white hover:bg-green-900 active:bg-amber-600" >
            Start Timer
          </button>
        </form>
      </div>
      <div className="flex-col m-10 border rounded">
        <h3 className="text-center font-bold">Time submissions</h3>
        {isLoading ? (
          <p className="mt-4">Loading time entries...</p>
        ) : (
            
              <ul className="mt-4 space-y-2">
              {entries == 0 ? (
                <p className="text-center text-indigo-600"> No time submitted on this project. </p>
              ) : (
                entries?.map((e) => (
              <li key={e.id} className=" px-2 flex justify-between">
                <span className="font-bold"> {e.notes} </span>
                <span className="text-sm">Start: {new Date(e.startTime).toLocaleString()}</span>
                <span className="text-sm">End: {new Date(e.endTime).toLocaleString()}</span>

                {!e.endTime && (
                  <button
                    onClick={() => handleStop(e.id)}
                    className="mx-10 bg-red-500 text-white px-2 rounded-2xl"
                  >
                    Stop
                  </button>
                )}
              </li>
            )))}
              </ul>
            )}
      </div>
    </>
  );
}
