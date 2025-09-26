import {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} from "../routes/invoices/invoicesApi";
import { useGetProjectsQuery } from "../routes/projects/projectsApi";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import { BOX_TITLE_STYLING, BOX_CONTAINER_STYLING } from "../utils/commonStyles";
import { useState, useEffect } from "react";
//TODO::Finish page layout

export default function Invoices() {
  const COLUMNS = ["id", "projectName", "createdAt", "issuedAt", "total"];
  const { status: invStatus, data, isLoading } = useGetInvoicesQuery();
  const [invoices, setInvoices] = useState([]);
  const {data: projects = [] } = useGetProjectsQuery();
  const [createInvoice] = useCreateInvoiceMutation();
  
  useEffect(() => {
    if (invStatus == "fulfilled") {
      setInvoices(data);
    }
  }, [invStatus, data]);
  const handleCreate = async (projectId) => {
    try {
      await createInvoice({ projectId: projectId }).unwrap();
    } catch (err) {
      console.error("Failed to create the invoice: ", err);
    }
  };

  // Adding project name and updating the dateTime string to a more readable format
  const invoiceList = invoices?.map((inv) => ({
    id: inv.id,
    total: `$${inv.total}`,
    projectName: inv.project.name,
    createdAt: new Date(inv.createdAt).toLocaleDateString(),
    issuedAt: new Date(inv.issuedAt).toLocaleDateString(),
  }));


  return (
    <>
      <div className="flex flex-col px-6 mt-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl flex shrink-0">
          <h2 className="my-10 w-full text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-gray-300">
            Invoices
          </h2>
        </div>

        <div className={BOX_CONTAINER_STYLING}>
          <div className="w-full ">
            <h2 className={BOX_TITLE_STYLING}>Create New Invoice</h2>
          </div>
          <div className="mt-10 ">
            <ul className="mb-6 col-auto flex gap-3 flex-wrap px-5">
              {projects.map((p) => (
                <li key={p.id}>
                  <Button
                    onClick={() => handleCreate(p.id)}
                    className="bg-blue-900 px-10 py-1.5 rounded-xl w-full mb-2 text-gray-300 hover:bg-blue-700 focus:outline-none focus:ring-2 mx-auto sm:mx-w-full sm:max-w-sm focus:ring-blue-500 focus:ring-offset-2 shrink-0"
                    title={p.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={BOX_CONTAINER_STYLING}>
          <div className="mb-6">
            <h2 className={BOX_TITLE_STYLING}>Existing Invoices</h2>
          </div>
          <div className="mt-5 p-2 rounded-lg">
            {isLoading && invoices?.length == 0 ? (
              <p>Loading invoices...</p>
            ) : (
              <DataTable columns={COLUMNS} data={invoiceList} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
