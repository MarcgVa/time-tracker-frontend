import React from 'react'
import { useCreateInvoiceMutation, useGetInvoicesQuery } from '../features/invoices/invoicesApi'
import { useGetProjectsQuery } from '../features/projects/projectsApi';

//TODO::Finish page layout

export default function Invoices() {

  const { data: invoices = [], isLoading } = useGetInvoicesQuery();
  const { data: projects = [] } = useGetProjectsQuery();
  const [createInvoice] = useCreateInvoiceMutation();

  const handleCreate = async (projectId) => {
    console.log(projectId);
    await createInvoice({'projectId': projectId}).unwrap();
  }

  return (
    <>
      <div className="mt-10 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-gray-400 ">Invoices</h2>

          <h2 className="font-bold mb-2">Create New Invoice</h2>
          <ul className="mb-6">
            {projects.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => handleCreate(p.id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Generate Invoice for {p.name}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="font-bold mb-2">Existing Invoices</h2>
          {isLoading ? (
            <p>Loading invoices...</p>
          ) : (
            <ul className="space-y-2">
              {invoices.map((inv) => (
                <li key={inv.id} className="border p-2 rounded">
                  Invoice #{inv.id} — ${inv.total}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
