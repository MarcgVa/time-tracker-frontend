import React from "react";
import PageTitle from "../../Shared/components/PageTitle";
import { InvoiceLineItems } from "../components/InvoiceLineItems";
import { InvoiceSummaryCard } from "../components/InvoiceSummaryCard";

export default function InvoiceDetails() {
  return (
    <div className="flex min-h-10 flex-col justify-center px-6 lg:px-8">
      <PageTitle title="Invoice Details" />
      <InvoiceSummaryCard />
      <InvoiceLineItems />
    </div>
  );
}
