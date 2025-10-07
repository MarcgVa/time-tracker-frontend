import React from "react";
import PageTitle from "../components/shared/PageTitle";
import { InvoiceLineItems } from "../components/invoices/InvoiceLineItems";
import { InvoiceSummaryCard } from "../components/invoices/InvoiceSummaryCard";


export default function InvoiceDetails() {

  return (
    <div>
      <PageTitle title="Invoice Details" />
      <InvoiceSummaryCard/>
      <InvoiceLineItems />
    </div>
  );
}
