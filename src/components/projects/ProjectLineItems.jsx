import { useEffect, useState } from "react";
import { useGetTimeEntriesQuery } from "../../routes/timeEntries/timeEntriesApi";
import DataTable from "../shared/DataTable";
import { BOX_TITLE_STYLING, BOX_CONTAINER_STYLING } from "../../utils/commonStyles";


export const ProjectLineItems = ({ projectId }) => {
  const { status,data = [], isLoading } = useGetTimeEntriesQuery(projectId);
  const [entries, setEntries] = useState();

  const columns = ["task", "startTime", "endTime"];

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
};
