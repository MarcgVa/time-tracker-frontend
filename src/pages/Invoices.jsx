import PageTitle from "../components/shared/PageTitle";
import { NewInvoice } from "../components/invoices/NewInvoice";
import { InvoiceList } from "../components/invoices/InvoiceList";

export default function Invoices() {
  return (
    <div className="flex min-h-10 flex-col justify-center px-6 lg:px-8">
      <PageTitle title="Invoices" />
      <NewInvoice />
      <InvoiceList />
    </div>
  );
}
