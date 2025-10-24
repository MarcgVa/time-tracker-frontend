import { NewInvoice } from "../components/NewInvoice";
import { InvoiceList } from "../components/InvoiceList";


export default function InvoicePage() {
  return (
    <div className="relative w-full h-full flex flex-col justify-start">
      <div className="mb-6 m-4">
        <h1 className="ml-2 text-white text-4xl font-bold tracking-widest ">
          Invoices
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-950/90 ml-2 mr-4 rounded-2xl">
          <NewInvoice />
        </div>
        <div className="bg-gray-950/90 ml-2 mr-4 rounded-2xl">
          <InvoiceList />
        </div>
      </div>
    </div>
  );
}
