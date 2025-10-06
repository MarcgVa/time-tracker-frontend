import { useParams } from "react-router-dom";
import {
  useGetTimeEntriesQuery,
  useStartTimerMutation,
  useStopTimerMutation,
} from "../routes/timeEntries/timeEntriesApi";
import { useGetProjectQuery } from "../routes/projects/projectsApi";
import { useEffect, useState } from "react";
import Button from "../components/shared/Button";
import DataTable from "../components/shared/DataTable";
import PageTitle from "../components/shared/PageTitle";
import {
  BOX_TITLE_STYLING,
  BOX_CONTAINER_STYLING,
  INPUT_STYLING,
} from "../utils/commonStyles";




export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const { status, data } = useGetProjectQuery(id);
  
  useEffect(() => {
    if (status == "fulfilled") {
      setProject(data);
    }
  }, [status, data]);
  
  return (
    <>
      <PageTitle title={project?.name || "Project Details"} />
      <NewTimeEntry projectId={id} />
      <InvoiceSummary projectId={id} />
    </>
  );
}







function NewTimeEntry({ projectId }) {
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const [entryId, setEntryId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [notes, setNotes] = useState("no notes");
  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const entry = await startTimer({ projectId: projectId, notes: notes });
      setEntryId(entry.data.id);
    } catch (err) {
      console.error(err);
    }
  };
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
  },[entryId]);

  return (
    <div className="flex sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
      <div className={BOX_CONTAINER_STYLING}>
        <div>
          <h2 className={BOX_TITLE_STYLING}>Start New Task</h2>
        </div>

        <div className="flex sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-6xl lg:px-8 w-full">
            <form onSubmit={handleStart}>
              <div className="sm:w-full sm:max-w-6xl">
                <input
                  id="notes"
                  name="notes"
                  type="text"
                  placeholder="Task Title - be descriptive"
                  onChange={handleUpdate}
                  className={INPUT_STYLING}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  isLoading={false}
                  onClick={handleStart}
                  type="submit"
                  className="mr-5 mt-2 px-10 py-2  rounded-xl bg-emerald-800 text-gray-300 dark:hover:text-indigo-400 disabled:opacity-50"
                  title="Start Timer"
                  disabled={!buttonDisabled}
                />
                <div className="inline ">
                  <Button
                    isLoading={false}
                    disabled={buttonDisabled}
                    onClick={() => handleStop(entryId)}
                    type="button"
                    className=" mt-2 px-15 py-2 rounded-xl bg-red-800 text-gray-300 dark:hover:text-red-400 disabled:opacity-50"
                    title="Stop"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceSummary({ projectId }) {
  const {
    status: entryStatus,
    data: entryData = [],
    isLoading,
  } = useGetTimeEntriesQuery(projectId);
  const [entries, setEntries] = useState();

  const columns = ["notes", "startTime", "endTime"];

  useEffect(() => {
    if (entryStatus == "fulfilled") {
      setEntries(entryData);
    }
  }),
    [entryStatus, entryData];
  
  
  const entryList = entries?.map((item) => ({
    id: item.id,
    notes: item.notes,
    startTime: new Date(item.startTime).toLocaleString(),
    endTime: new Date(item.endTime).toLocaleString(),
  }));

  return (
    <div className="flex sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
      <div className={BOX_CONTAINER_STYLING}>
        <div>
          <h3 className={BOX_TITLE_STYLING}>Time Submissions</h3>
        </div>
        <div className="mt-5 p-2 rounded-lg">
          {isLoading ? (
            <p>Loading time submissions</p>
          ) : (
            <DataTable columns={columns} data={entryList || []} />
          )}
        </div>
      </div>
    </div>
  );
}
