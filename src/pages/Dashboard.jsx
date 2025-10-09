import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../routes/projects/projectsApi";
import DataTable from "../components/shared/DataTable";
import NewProject from "../components/modals/NewProject";
import PageTitle from "../components/shared/PageTitle";
import Button from "../components/shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const columns = ["name", "description", "hourlyRate", "actions"];
  const { status, data, isLoading } = useGetProjectsQuery();
  const [projects, setProjects] = useState([]);
  const [isModal, setModal] = useState(false);


  const toggleModal = () => {
    setModal(!isModal);
  }

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
    <div className="h-lvh max-h-lvh flex flex-col">
      <div className="flex flex-col justify-center items-center mx-auto my-auto bg-gray-500">
        {/* <PageTitle title="Projects" /> */}

        {isModal && <NewProject setToggleModal={toggleModal} />}

        <div className="p-2">
          <div className="mx-auto py-1 flex justify-between items-center min-w-7xl overflow-visible">
            <div>
              <h2 className="text-md text-gray-800 font-semibold ">
                Project List: ({projects && projects.length})
              </h2>
            </div>
            <div>
              <Button
                onClick={toggleModal}
                disabled={isModal}
                type="submit"
                className="cursor-pointer text-sm mx-10"
                icon={<FontAwesomeIcon icon={faPlus} />}
                title={"Project"}
              />
            </div>
          </div>
          <div className="p-1">
            {isLoading && projects?.length == 0 ? (
              <p>Loading projects</p>
            ) : (
              <DataTable columns={columns} data={projects} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
