import { useEffect, useState } from "react";
import { useGetTimeEntriesQuery,useStopTimerMutation } from "../../routes/timeEntries/timeEntriesApi";
import { calculateTimeDifference } from "../../utils/TimeConversion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../shared/DataTable";



export const ProjectLineItems = ({ projectId }) => {
  const { status, data = [], isLoading } = useGetTimeEntriesQuery(projectId);
  const [entryId, setEntryId] = useState(null);
  const [stopTimer] = useStopTimerMutation();
  const [entries, setEntries] = useState();
  const columns = ["task", "startTime", "endTime","duration", "action"];


  async function handleStop(entryId) {
    await stopTimer(entryId);
    setEntryId(null);
   ;
  }

  useEffect(() => {
    if (status == "fulfilled") {
      setEntries(data);
    }
  },[status, data]);

  const entryList = entries?.map((item) => ({
    id: item.id,
    task: item.notes,
    startTime: new Date(item.startTime).toLocaleString(),
    endTime: item.endTime && new Date(item.endTime).toLocaleString(),
    duration: item.endTime && calculateTimeDifference(item.startTime, new Date(item.endTime)).duration,
    action: !item.endTime && <a onClick={()=> handleStop(item.id)} className="text-red-600 hover:underline ">
      <FontAwesomeIcon icon={faStop} />
      </a>,
  }));

  const item = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="flex sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
      <div className="max-w-7xl sm:mx-auto sm:w-full border dark:border-gray-600 border-gray-900 bg-gray-400">
        <div className="mx-auto px-2 py-2">
          <h2 className="text-lg text-black font-semibold text-shadow-xs text-shadow-gray-400/90">
            Time Submissions
          </h2>
        </div>

        <div>
          {isLoading ? (
            <p>Loading time submissions</p>
          ) : (
            <DataTable columns={columns} data={entryList || []} />
          )}
        </div>
      </div>
    </div>
  );
};
