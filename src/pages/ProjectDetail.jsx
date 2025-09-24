import { useParams } from "react-router-dom";
import {
  useGetTimeEntriesQuery,
  useStartTimerMutation,
  useStopTimerMutation,
} from "../features/timeEntries/timeEntriesApi";
import { useGetProjectQuery } from "../features/projects/projectsApi";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";


const COLUMNS = ["notes", "startTime", "endTime", "actions"];

export default function ProjectDetail() {
  const { id } = useParams();
  const { status: entryStatus, data: entryData = [], isLoading } = useGetTimeEntriesQuery(id);
  const { status, data } = useGetProjectQuery(id);
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const [project, setProject] = useState([]);
  const [entries, setEntries] = useState();
  const [entryId, setEntryId] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [notes, setNotes] = useState("no notes");

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const entry = await startTimer({ projectId: id, notes: notes })
      setEntryId(entry.data.id);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleStop(entryId) {
    await stopTimer(entryId);
    setEntryId(null);
  }

  const handleUpdate = (e) => { 
    setNotes((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  useEffect(() => { 
    !entryId ? setButtonDisabled(true) : setButtonDisabled(false);
  }), [entryId];
  
  
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-widest text-indigo-900 dark:text-indigo-500">
            Project:
            <span className="px-5 text-gray700 dark:text-gray-300">{project?.name}</span>
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
            <Button
              isLoading={false}
              onClick={handleStart}
              type="submit"
              className="mx-2 px-3 py-1 rounded-xl bg-emerald-800 text-gray-300 dark:hover:text-indigo-400 disabled:opacity-50"
              title="Start Timer"
              disabled={!buttonDisabled}
            />
            <div className="inline-block">
              <Button
                isLoading={false}
                disabled={buttonDisabled}
                onClick={() => handleStop(entryId)}
                type="button"
                className=" mx-2 px-3 py-1 rounded-xl bg-red-800 text-gray-300 dark:hover:text-red-400 disabled:opacity-50"
                title="Stop"
              />
            </div>
          </form>
        </div>

        <div className="">
          <h3 className="mb-10 mt-20 text-indigo-500 text-2xl/9 tracking-wide text-center font-bold">
            Time Submissions
          </h3>
          {isLoading ? (
            <p>Loading time submissions</p>
          ) : (
            <DataTable columns={COLUMNS} data={entries || []} />
          )}
        </div>
      </div>
    </>
  );
}
