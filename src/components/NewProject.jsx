import { useState } from "react";
import { useCreateProjectMutation } from "../routes/projects/projectsApi";
import Button from "./shared/Button";
import {
  BOX_CONTAINER_STYLING,
  BOX_TITLE_STYLING,
  INPUT_STYLING,
} from "../utils/commonStyles";

export default function NewProject() {
  const [createProject] = useCreateProjectMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hourlyRate: 0,
  });

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
      console.error("Sign failed", err);
    }
  };

  return (
    <>
      <div className="flex mt-10 mx-40 px-4 sm:mx-auto sm:w-full sm:max-w-6xl justify-center">
        <div className={BOX_CONTAINER_STYLING}>
          <div className={BOX_TITLE_STYLING}>Add New Project</div>
          <div className="mt-10 px-10">
            <form 
              onSubmit={handleSubmit}
              className="relative flex space-x-6 space-y-6 lg:space-x-8"
            >
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Project Name"
                  onChange={handleUpdate}
                  autoComplete="projectName"
                  className={INPUT_STYLING}
                />
              </div>

              <div>
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description"
                  onChange={handleUpdate}
                  autoComplete="description"
                  className={INPUT_STYLING}
                />
              </div>

              <div>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  placeholder="Hourly Rate"
                  onChange={handleUpdate}
                  autoComplete="hourlyRate"
                  className={INPUT_STYLING}
                />
              </div>

              <div>
                <Button
                  isLoading={false}
                  onClick={handleSubmit}
                  type="submit"
                  className=" absolute right-5 flex px-5 py-1 rounded-xl font-semibold bg-emerald-700 text-white dark:hover:text-green-400"
                  title="Add"
                  disabled={false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
