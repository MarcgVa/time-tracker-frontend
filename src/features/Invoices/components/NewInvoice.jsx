import { useCreateInvoiceMutation } from "../routes/invoicesApi";
import { useGetProjectsQuery } from "../../Projects/routes/projectsApi";
import Button from "../../shared/components/Button";
import {
  BOX_TITLE_STYLING,
  BOX_CONTAINER_STYLING,
} from "../../shared/utils/commonStyles";
import { useState, useEffect } from "react";

export const NewInvoice = () => {
  const { status, data = [] } = useGetProjectsQuery();
  const [createInvoice] = useCreateInvoiceMutation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (status == "fulfilled") {
      setProjects(
        data?.filter((proj) => proj.timeEntries.some((e) => e.invoice == null))
      );
    }
  }, [status, data]);

  const handleCreate = async (projectId) => {
    try {
      await createInvoice({ projectId: projectId }).unwrap();
      setProjects(
        projects?.filter(
          (proj) =>
            proj.id != projectId &&
            proj.timeEntries.some((e) => e.invoice == null)
        )
      );
    } catch (err) {
      console.error("Failed to create the invoice: ", err);
    }
  };

  return (
    <div className="flex mt-10 min-h-10 flex-col justify-center px-6 lg:px-8">
      <div className={BOX_CONTAINER_STYLING}>
        <div className="w-full ">
          <h2 className={BOX_TITLE_STYLING}>Create New Invoice</h2>
        </div>
        <div className="mt-10 ">
          <ul className="mb-6 col-auto flex gap-3 flex-wrap px-5">
            {projects.length === 0 ? (
              <p>No new tasks to invoice.</p>
            ) : (
              projects.map((p) => (
                <li key={p.id}>
                  <Button
                    onClick={() => handleCreate(p.id)}
                    className="bg-blue-900 px-10 py-1.5 rounded-xl w-full mb-2 text-gray-300 hover:bg-blue-700 focus:outline-none focus:ring-2 mx-auto sm:mx-w-full sm:max-w-sm focus:ring-blue-500 focus:ring-offset-2 shrink-0"
                    title={p.name}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
