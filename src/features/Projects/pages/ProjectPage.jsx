import { useEffect, useState } from "react";
import { NewProject } from "../components/NewProject";
import Button from "../../Shared/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../Shared/components/DataTable";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
} from "../routes/projectsApi";
import Table from "../components/Table";

const tableColumns = [
  {
    id: "name",
    col: "Project",
  },
  {
    id: "status",
    col: "Status",
  },
  {
    id: "hours",
    col: "Hours",
  },
  {
    id: "dueDate",
    col: "Due Date",
  },
];
const initialFormState = {
  name: "",
  description: "",
  hourlyRate: 0,
  dueDate: "",
};

export default function ProjectPage() {
  const [createProject] = useCreateProjectMutation();
  const { status, data, isLoading } = useGetProjectsQuery();
  const [formData, setFormData] = useState(initialFormState);
  const [isModal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!isModal);
  };
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (status === "fulfilled") {
      setProjects(data);
    }
  }, [status, data]);

  const handleUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(!isModal);
    try {
      if (formData.name == "") {
        console.log("just a toggle");
      } else {
        await createProject(formData).unwrap();
        console.log("formData submitted");
      }
    } catch (err) {
      console.error(err);
    }

    setFormData(initialFormState);
  };

  console.log(projects);

  return (
    <div className="relative w-full h-full flex flex-col justify-start">
      <div className="relative flex justify-between ">
        <div className="flex">
          {/* <NewProject setToggleModal={toggleModal}/> */}
          {isModal && (
            <NewProject handleUpdate={handleUpdate} data={formData} />
          )}
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            type="submit"
            className={
              !isModal
                ? "absolute mx-auto right-5 top-5 px-2 py-1 bg-blue-600 text-sm text-white rounded-xl items-center text-center cursor-pointer z-10"
                : "absolute mx-auto right-5 top-5 px-2 py-1 bg-green-600 text-sm text-white rounded-xl items-center text-center cursor-pointer z-10"
            }
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                className="text-md pr-1 text-center"
              />
            }
            title={isModal ? "Create Project" : "New Project"}
          />
        </div>
      </div>
      <div className="relative w-full h-full ">
        <Table data={projects} />
      </div>
    </div>
  );
}
