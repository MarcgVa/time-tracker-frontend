import React from "react";
import PageTitle from "../components/shared/PageTitle";
import { InvoiceLineItems } from "../components/invoices/InvoiceLineItems";
import { InvoiceSummaryCard } from "../components/invoices/InvoiceSummaryCard";


export default function InvoiceDetails() {

  return (
    <div className="flex min-h-10 flex-col justify-center px-6 lg:px-8">
      <PageTitle title="Invoice Details" />
      <InvoiceSummaryCard />
      <InvoiceLineItems />
    </div>
  );
}
