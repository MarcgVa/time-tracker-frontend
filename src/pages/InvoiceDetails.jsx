import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInvoiceDetailsQuery } from "../routes/invoices/invoicesApi";
import DataTable from "../components/shared/DataTable";
import PageTitle from "../components/shared/PageTitle";
import { useSelector } from "react-redux";
import {
  BOX_CONTAINER_STYLING,
  BOX_TITLE_STYLING,
} from "../utils/commonStyles";

//TODO::Add functionality to issue invoice if not issued yet
//TODO::Add total hours and rate per hour to the summary section
//TODO::Add PDF generation and download functionality
//TODO::Add "Mark as Paid" functionality

export default function InvoiceDetails() {
  return (
    <div>
      <PageTitle title="Invoice Details" />
      <SummaryCard />
      <InvoiceLineItems />
    </div>
  );
}



function SummaryCard() {
  const { invoice } = useSelector((state) => state.invoice);
  const storedInvoice = localStorage.getItem("invoice");
  const currentInvoice = storedInvoice ? JSON.parse(storedInvoice) : invoice;
  return (
    <div className="">
      <div className="sm:mx-auto sm:w-full sm:max-w-6xl p-6 lg:px-8">
        <div className={BOX_CONTAINER_STYLING}>
          <div className={BOX_TITLE_STYLING}>Invoice Summary</div>
          <div className="my-5 min-w-full grid grid-cols-4 gap-2 text-center text-md">
            <h4 className="font-bold text-stone-800">Project Name:</h4>
            <h4 className="font-bold text-stone-800">Invoice Created On:</h4>
            <h4 className="font-bold text-stone-800">Issued On:</h4>
            <h4 className="font-bold text-stone-800">Total Amount:</h4>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="text-stone-800  font-bold">
              {currentInvoice?.project?.name}
            </div>
            <div className="text-stone-800  font-bold">
              {new Date(currentInvoice?.createdAt).toLocaleDateString()}
            </div>
            <div>
              {currentInvoice?.issueAt ? (
                <p className="text-green-600 font-bold">
                  {new Date(currentInvoice?.issuedAt).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-red-900 font-bold">Not Issued</p>
              )}
            </div>
            <div>
              <p>${currentInvoice?.total || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceLineItems() {
  const { id } = useParams();
  const { status, data, isLoading } = useGetInvoiceDetailsQuery(id);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (status == "fulfilled") {
      setTableData(data);
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
}
