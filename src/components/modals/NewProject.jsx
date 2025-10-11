import React, { useState } from "react";
import { useCreateProjectMutation } from "../../routes/projects/projectsApi";
import Button from "../shared/Button";
import {
  MODAL_BG_STYLE,
  MODAL_BTN_STYLE,
  MODAL_CONTAINER_STYLE,
  MODAL_FORM_STYLE,
  MODAL_INPUT_CONTAINER_STYLE,
  MODAL_INPUT_STYLE,
} from "../../utils/commonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const initialFormState = {
  name: "",
  description: "",
  hourlyRate: 0,
};

export default function NewProject({ setToggleModal }) {
  const [createProject] = useCreateProjectMutation();
  const [formData, setFormData] = useState(initialFormState);

  const handleUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData).unwrap();
    } catch (err) {
      console.error(err);
    }

    setFormData(initialFormState);
  };

  return (
    <div className={MODAL_BG_STYLE}>
      <div className={MODAL_CONTAINER_STYLE}>
        <div className="absolute top-1 right-2 ">
          <FontAwesomeIcon
            icon={faXmark}
            className="cursor-pointer text-gray-400"
            onClick={setToggleModal}
          />
        </div>
        <div className={MODAL_FORM_STYLE}>
          <div className={MODAL_INPUT_CONTAINER_STYLE}>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleUpdate}
              autoComplete="projectName"
              className={MODAL_INPUT_STYLE}
            />
          </div>

          <div className={MODAL_INPUT_CONTAINER_STYLE}>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleUpdate}
              autoComplete="description"
              className={MODAL_INPUT_STYLE}
            />
          </div>

          <div className={MODAL_INPUT_CONTAINER_STYLE}>
            <input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              placeholder="Hourly Rate"
              value={formData.hourlyRate === 0 ? null : formData.hourlyRate}
              onChange={handleUpdate}
              autoComplete="hourlyRate"
              className={MODAL_INPUT_STYLE}
            />
          </div>

          <div className="flex text-sm mx-auto">
            <Button
              isLoading={false}
              onClick={handleSubmit}
              type="submit"
              className={MODAL_BTN_STYLE}
              title={"Create Project"}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
