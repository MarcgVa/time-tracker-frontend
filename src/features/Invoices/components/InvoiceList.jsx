import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInvoice } from "../routes/invoiceSlice";
import { useGetInvoicesQuery } from "../routes/invoicesApi";
import {
  BOX_TITLE_STYLING,
  BOX_CONTAINER_STYLING,
} from "../../Shared/utils/commonStyles";
import DataTable from "../../Shared/components/DataTable";
import Button from "../../Shared/components/Button";
import Table from "./Table";

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
    status: inv.status,
    createdAt: new Date(inv.createdAt).toLocaleDateString(),
    issuedAt: new Date(inv.issuedAt).toLocaleDateString(),
    actions: (
      <Button
        title="View"
        type="button"
        className="cursor-pointer px-2 py-1 rounded-xl bg-blue-500 text-white/50"
        onClick={() => handleOnClick(inv)}
      />
    ),
  }));

  return (
    <div className="flex min-h-10 flex-col justify-center">
      <div className="rounded-lg">
        {isLoading && invoices?.length == 0 ? (
          <p>Loading invoices...</p>
        ) : (
          <Table data={invoiceList} />
        )}
      </div>
    </div>
  );
};
