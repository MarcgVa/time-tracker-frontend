import { useState } from "react";
import NewProject from "../components/modals/NewProject";
import Button from "../components/shared/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProjectCards } from "../components/projects/ProjectCards";
import { ProjectSummary } from "../components/projects/ProjectSummary";

export default function ProjectPage() {
  const [isModal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!isModal);
  };

  return (
    <div className="h-lvh max-h-lvh flex flex-col mt-12">
      <div className="flex justify-start py-4 bg-gray-400">
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
      <ProjectSummary />
      <ProjectCards />
    </div>
  );
}
