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
      <div className="flex px-6 py-12 lg:px-8 flex-col ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-indigo-500">
            Project:
            <span className="px-5 dark:text-gray-300">{project?.name}</span>
          </h2>
        </div>

        <div className="mt-10 ">
          <form onSubmit={handleStart}>
            <input
              id="notes"
              name="notes"
              type="text"
              placeholder="Task Title"
              onChange={handleUpdate}
              className="mx-2 px-4 py-1 w-full sm:w-full md:w-2xl lg:w-3xl placeholder:text-gray-600 text-sm text-gray-900 dark:text-gray-400
              border border-gray-900 dark:border-gray-600 rounded-md"
            />
            <button
              type="submit"
              className="mx-4 px-5 rounded-md text-green-600 border border-green-600 dark:hover:border-green-900"
            >
              Start Timer
            </button>
          </form>
        </div>

        <div className="flex mx-2 my-4 px-6 py-4 lg:px-8 flex-col text-gray-900 dark:text-gray-400 border dark:border-gray-600 border-gray-900 rounded-md ">
          <h3 className="mb-4 text-indigo-500 text-xl/9 text-center font-bold">Time submissions</h3>
          {isLoading ? (
            <p className="mt-4">Loading time entries...</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {entries == 0 ? (
                <p className="text-center text-indigo-500 dark:text-indigo-500">
                  {" "}
                  No time submitted on this project.{" "}
                </p>
              ) : (
                entries?.map((e) => (
                  <li key={e.id} className=" px-2 flex justify-between">
                    <span className="text-indigo-500 dark:text-indigo-500"> {e.notes} </span>
                    <span className="text-sm">
                      Start: {new Date(e.startTime).toLocaleString()}
                    </span>
                    <span className="text-sm">
                      End: {new Date(e.endTime).toLocaleString()}
                    </span>

                    {!e.endTime && (
                      <button
                        onClick={() => handleStop(e.id)}
                        className="mx-10 px-4 text-red-600 dark:text-red-600 border border-red-600 rounded-md"
                      >
                        Stop
                      </button>
                    )}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
