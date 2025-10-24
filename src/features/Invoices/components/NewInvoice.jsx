import { useCreateInvoiceMutation } from "../routes/invoicesApi";
import { useGetProjectsQuery } from "../../Projects/routes/projectsApi";
import Button from "../../Shared/components/Button";
import {
  BOX_TITLE_STYLING,
  BOX_CONTAINER_STYLING,
} from "../../Shared/utils/commonStyles";
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
    <div className="flex flex-col justify-start ml-2">
      <div className="flex-col w-full">
        <div className="w-full">
          <h2 className="m-2 text-white text-xl font-bold tracking-wider pl-2">Pending</h2>
        </div>
        <div className="">
          <ul className="mb-6 col-auto flex gap-3 flex-wrap px-5">
            {projects.length === 0 ? (
              <p>No new tasks to invoice.</p>
            ) : (
              projects.map((p) => (
                <li key={p.id}>
                  <Button
                    onClick={() => handleCreate(p.id)}
                    className="bg-blue-950 px-5 py-1.5 rounded-xl text-white/50 hover:bg-blue-700 focus:outline-none focus:ring-2 mx-auto sm:mx-w-full sm:max-w-sm focus:ring-blue-500 focus:ring-offset-2 shrink-0"
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
