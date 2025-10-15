import { useState } from "react";
import NewProject from "../modals/NewProject";
import Button from "../../shared/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ProjectCards } from "../components/ProjectCards";
import { ProjectSummary } from "../components/ProjectSummary";

export default function ProjectPage() {
  const [isModal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!isModal);
  };

  return (
    <div className="h-lvh max-h-lvh flex flex-col mt-12 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="flex justify-start py-4 ">
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
