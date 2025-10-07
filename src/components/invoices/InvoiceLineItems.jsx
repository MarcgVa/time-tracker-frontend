import { useMemo } from "react";
import { useGetInvoiceDetailsQuery } from "../../routes/invoices/invoicesApi";
import DataTable from "../shared/DataTable";
import { BOX_TITLE_STYLING, BOX_CONTAINER_STYLING } from "../../utils/commonStyles";
import { useParams } from "react-router-dom";


export const InvoiceLineItems = () => {
  const { id } = useParams();
  const { status, data, isLoading } = useGetInvoiceDetailsQuery(id);
  
  const tableData = useMemo(() => {
    if (status == "fulfilled") {
      return data;
    }
  }, [status, data]);

  const timeEntries = tableData?.map((entry) => ({
    task: entry.notes,
    startTime: new Date(entry.startTime).toLocaleString(),
    endTime: entry.endTime
      ? new Date(entry.endTime).toLocaleString()
      : "In Progress",
  }));

  return (
    <div>
      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
        <div className={BOX_CONTAINER_STYLING}>
          <div className={BOX_TITLE_STYLING}>Invoice Line Items</div>
          <div className="mt-10 sm:mx-auto sm:w-full border dark:border-gray-600 border-gray-900">
            {isLoading ? (
              <p>Loading invoice details...</p>
            ) : (
              <DataTable
                columns={["task", "startTime", "endTime"]}
                data={timeEntries || []}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
