import {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} from "../routes/invoices/invoicesApi";
import { useGetProjectsQuery } from "../routes/projects/projectsApi";
import DataTable from "../components/shared/DataTable";
import Button from "../components/shared/Button";
import {
  BOX_TITLE_STYLING,
  BOX_CONTAINER_STYLING,
} from "../utils/commonStyles";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInvoice } from "../routes/invoices/invoiceSlice";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/shared/PageTitle";



export default function Invoices() {
  return (
    <div>
      <PageTitle title="Invoices" />
      <NewInvoice />
      <InvoiceList />
    </div>
  );
}



function NewInvoice() {
  const { data: projects = [] } = useGetProjectsQuery();
  const [createInvoice] = useCreateInvoiceMutation();

  const handleCreate = async (projectId) => {
    try {
      await createInvoice({ projectId: projectId }).unwrap();
    } catch (err) {
      console.error("Failed to create the invoice: ", err);
    }
  };

  return (
    <div className="flex mt-10 min-h-10 flex-col justify-center px-6 lg:px-8">
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
    </div>
  );
}

function InvoiceList() {
  const columns = ["projectName", "createdAt", "issuedAt", "total", "actions"];
  const { status, data, isLoading } = useGetInvoicesQuery();
  const [invoices, setInvoices] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status == "fulfilled") {
      setInvoices(data);
    }
  }, [status, data]);

  const handleOnClick = (inv) => {
    dispatch(setInvoice(inv));
    navigate(`/invoices/${inv.id}`);
  };

  // Adding project name and updating the dateTime string to a more readable format
  const invoiceList = invoices?.map((inv) => ({
    id: inv.id,
    total: `$${inv.total}`,
    projectName: inv.project.name,
    createdAt: new Date(inv.createdAt).toLocaleDateString(),
    issuedAt: new Date(inv.issuedAt).toLocaleDateString(),
    actions: (
      <Button
        title="View"
        type="button"
        className="cursor-pointer px-5 py-1 rounded-xl bg-indigo-500 text-indigo-200"
        onClick={() => handleOnClick(inv)}
      />
    ),
  }));

  return (
    <div className="flex min-h-10 flex-col justify-center px-6 lg:px-8">
      <div className={BOX_CONTAINER_STYLING}>
        <div className="mb-6">
          <h2 className={BOX_TITLE_STYLING}>Existing Invoices</h2>
        </div>
        <div className="mt-5 p-2 rounded-lg">
          {isLoading && invoices?.length == 0 ? (
            <p>Loading invoices...</p>
          ) : (
            <DataTable columns={columns} data={invoiceList} />
          )}
        </div>
      </div>
    </div>
  );
}
