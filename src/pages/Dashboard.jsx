import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../routes/projects/projectsApi";
import DataTable from "../components/shared/DataTable";
import NewProject from "../components/NewProject";
import PageTitle from "../components/shared/PageTitle";


export default function Dashboard() {
  const columns = ["name", "description", "hourlyRate", "actions"];
  const { status, data, isLoading } = useGetProjectsQuery();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (status == "fulfilled") {
      setProjects(
        data?.map((project) => ({
          ...project,
          actions: (
            <a
              href={`/projects/${project.id}`}
              className="cursor-pointer px-5 py-1 rounded-xl bg-indigo-500 text-indigo-200"
            >
              View
            </a>
          ),
        }))
      );
    }
  }, [status, data]);

  return (
    <>
      <div className="flex min-h-10 flex-col justify-center px-6 py-12 lg:px-8">
        <PageTitle title='Project Dashboard' /> 
        
        <NewProject />

        <div className="mt-10 sm:mx-auto sm:w-full border dark:border-gray-600 border-gray-900">
          {isLoading && projects?.length == 0 ? (
            <p>Loading projects</p>
          ) : (
            <DataTable columns={columns} data={projects} />
          )}
        </div>
      </div>
    </>
  );
}
