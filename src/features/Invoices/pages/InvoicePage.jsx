import PageTitle from "../../shared/components/PageTitle";
import { NewInvoice } from "../components/NewInvoice";
import { InvoiceList } from "../components/InvoiceList";

export default function InvoicePage() {
  return (
    <div className="h-lvh max-h-lvh flex flex-col mt-12 bg-gradient-to-b from-gray-900 to-gray-950">
      <NewInvoice />
      <InvoiceList />
    </div>
  );
}
