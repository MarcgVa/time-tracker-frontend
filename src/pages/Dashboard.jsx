import { useEffect, useState } from "react";
import {useGetProjectsQuery} from "../features/projects/projectsApi";
import DataTable from "../components/DataTable";
import NewProject from "../components/NewProject";


export default function Dashboard() {
  const columns = ['name', 'description', 'hourlyRate'];
  const { status, data, isLoading } = useGetProjectsQuery();
  const [projects, setProjects] = useState([]);
 
  useEffect(() => {
    if (status == "fulfilled") {
      setProjects(data);
    }
  }),
    [status, data];


  return (
    <>
      <div className="flex min-h-10 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-gray-300">
            Project Dashboard
          </h2>
        </div>
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
