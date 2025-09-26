import { use, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInvoiceDetailsQuery } from "../routes/invoices/invoicesApi";
import DataTable from "../components/DataTable";
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
  const { id } = useParams();
  const { invoice } = useSelector((state) => state.invoice);
  const { status, data, isLoading } = useGetInvoiceDetailsQuery(id);
  const [tableData, setTableData] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(()=> {
    const storedInvoice = localStorage.getItem("invoice");
    return storedInvoice ? JSON.parse(storedInvoice) : invoice;
  });
  
  useEffect(() => { 
    if (invoice == null) {
      localStorage.setItem("invoice", JSON.stringify(invoice));
    }
  }, [id,invoice]);
  
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
    <>
      <div className="flex flex-col px-6 mt-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full my-10">
          <h2 className="text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-gray-300">
            InvoiceDetails
          </h2>
        </div>
        <div className={BOX_CONTAINER_STYLING}>
          <div className={BOX_TITLE_STYLING}>Invoice Summary</div>
          <div className="my-5 grid grid-cols-4 gap-2 text-center text-md">
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
        <div className="my-10">
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
    </>
  );
}
