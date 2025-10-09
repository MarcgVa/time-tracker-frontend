import { useEffect, useState } from "react";
import { useGetTimeEntriesQuery } from "../../routes/timeEntries/timeEntriesApi";
import DataTable from "../shared/DataTable";
import { BOX_TITLE_STYLING, BOX_CONTAINER_STYLING } from "../../utils/commonStyles";
import { calculateTimeDifference } from "../../utils/TimeConversion";

export const ProjectLineItems = ({ projectId }) => {
  const { status,data = [], isLoading } = useGetTimeEntriesQuery(projectId);
  const [entries, setEntries] = useState();

  const columns = ["task", "startTime", "endTime","duration"];

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
    duration: item.endTime
      ? calculateTimeDifference(item.startTime, item.endTime).duration
      : null,
  }));

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
