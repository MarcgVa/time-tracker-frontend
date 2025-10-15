import React from "react";
import { useSelector } from "react-redux";
import { BOX_TITLE_STYLING } from "../../shared/utils/commonStyles";

export const InvoiceSummaryCard = () => {
  const { invoice } = useSelector((state) => state.invoice);
  const storedInvoice = localStorage.getItem("invoice");
  const currentInvoice = storedInvoice ? JSON.parse(storedInvoice) : invoice;

  return (
    <div className="flex">
      <div className="flex mx-10 ">
        <div className="relative sm:mx-auto mx-2 mb-15 p-2 border dark:border-gray-600 border-gray-900 rounded-lg bg-zinc-200 dark:bg-zinc-400">
          <div className={BOX_TITLE_STYLING}>Invoice Summary</div>
          <div className="mx-5 my-5 flex flex-col justify-items-start text-sm">
            <div className="flex gap-5">
              <h4 className="font-bold text-gray-900 w-30">Project Name:</h4>
              <p>{currentInvoice?.project?.name}</p>
            </div>

            <div className="flex gap-5">
              <h4 className="font-bold text-gray-900 w-30">Created On:</h4>
              <p>{new Date(currentInvoice?.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-5">
              <h4 className="font-bold text-gray-900 w-30">Issued On:</h4>
              {currentInvoice?.issueAt ? (
                <p className="text-green-600 font-bold">
                  {new Date(currentInvoice?.issuedAt).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-red-900 font-bold">Not Issued</p>
              )}
            </div>

            <div className="flex gap-5">
              <h4 className="font-bold text-gray-900 w-30">Total Amount:</h4>
              <p>${currentInvoice?.total || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
