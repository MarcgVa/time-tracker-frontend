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
  const { data: entries = [], isLoading } = useGetTimeEntriesQuery(id);
  const { status, data } = useGetProjectQuery(id);
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const [project, setProject] = useState();
  const [notes, setNotes] = useState({notes:""});

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

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Project: {project?.name}
        </h1>
      </div>
      <div className="flex mx-10 ">
        <form onSubmit={handleStart} className="">
          <input
            type="text"
            placeholder="Project notes"
            name="notes"
            onChange={handleUpdate}
            className="border"
          />
          <button className="mx-4 border px-5 rounded bg-green-600 text-white hover:bg-green-900 active:bg-amber-600" >
            Start Timer
          </button>
        </form>
      </div>
      <div className="flex m-10">
        {isLoading ? (
          <p className="mt-4">Loading time entries...</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {entries.map((e) => (
              <li key={e.id} className="border p-2 flex justify-between">
                <span>
                  {e.notes} — {new Date(e.startTime).toLocaleString()}
                </span>
                {!e.endTime && (
                  <button
                    onClick={() => handleStop(e.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Stop
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
