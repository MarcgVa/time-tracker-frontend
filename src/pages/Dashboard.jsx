import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../routes/projects/projectsApi";
// import DataTable from "../components/shared/DataTable";
import NewProject from "../components/modals/NewProject";
// import PageTitle from "../components/shared/PageTitle";

import Button from "../components/shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../components/shared/Card";
import { useNavigate } from "react-router-dom";
import { useDeleteProjectMutation } from "../routes/projects/projectsApi";

export default function Dashboard() {
  // const columns = ["name", "description", "hourlyRate", "actions"];
  const { status, data, isLoading } = useGetProjectsQuery();
  const [projects, setProjects] = useState([]);
  const [isModal, setModal] = useState(false);
  const navigate = useNavigate();
  const [deleteProject] = useDeleteProjectMutation();

  const toggleModal = () => {
    setModal(!isModal);
  };

  const handleDeleteProject = async (id) => {
    const data = {projectId:id}
    try {
      console.log('projectid', data);
      await deleteProject(data).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

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
    <div className="h-lvh max-h-lvh flex flex-col mt-12">
      <div className="flex justify-start py-4 bg-gray-500">
        {isModal && <NewProject setToggleModal={toggleModal} />}
        <Button
          onClick={toggleModal}
          disabled={isModal}
          type="submit"
          className="flex items-center mx-5 px-5 py-3 gap-4 bg-emerald-800 rounded-md 
          text-xs text-emerald-200 font-bold tracking-wider cursor-pointer"
          icon={<FontAwesomeIcon icon={faPlus} />}
          title={"Add Project"}
        />
      </div>

      <div className="flex py-5 px-2 justify-evenly flex-wrap gap-4">
        {isLoading && projects?.length == 0 ? (
          <p>Loading projects</p>
        ) : (
          projects?.map((item) => {
            return (
              <Card
                key={item.id}
                title={item.name}
                description={item.description}
                hourlyRate={item.hourlyRate}
              >
                <Button
                  onClick={() => {
                    navigate(`/projects/${item.id}`);
                  }}
                  title={"view"}
                  className={
                    "bg-emerald-900 text-emerald-200 px-2 rounded cursor-pointer"
                  }
                />
                <Button
                  onClick={() => {
                    handleDeleteProject(item.id);
                  }}
                  title={"Delete"}
                  className={
                    "bg-red-900 text-red-200 px-2 rounded cursor-pointer"
                  }
                />
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
{
  /* <div className="p-1">
            {isLoading && projects?.length == 0 ? (
              <p>Loading projects</p>
              ) : (
                <DataTable columns={columns} data={projects} />
                )}
                </div> */
}
