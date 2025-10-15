import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInvoice } from "../routes/invoiceSlice";
import { useGetInvoicesQuery } from "../routes/invoicesApi";
import {
  BOX_TITLE_STYLING,
  BOX_CONTAINER_STYLING,
} from "../../shared/utils/commonStyles";
import DataTable from "../../shared/components/DataTable";
import Button from "../../shared/components/Button";

export const InvoiceList = () => {
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
};
