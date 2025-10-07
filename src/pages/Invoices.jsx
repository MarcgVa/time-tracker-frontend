import PageTitle from "../components/shared/PageTitle";
import { NewInvoice } from "../components/invoices/NewInvoice";
import { InvoiceList } from "../components/invoices/InvoiceList";

export default function Invoices() {
  return (
    <div>
      <PageTitle title="Invoices" />
      <NewInvoice />
      <InvoiceList />
    </div>
  );
}
