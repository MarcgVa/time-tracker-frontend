import { useState } from "react";
import { useCreateProjectMutation } from "../features/projects/projectsApi";
import Button from "./Button";

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
        <form
          onSubmit={handleSubmit}
          className="flex space-x-6 space-y-6 lg:space-x-8"
        >
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Project Name"
              onChange={handleUpdate}
              autoComplete="projectName"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            />
          </div>

          <div>
            <Button
              isLoading={false}
              onClick={handleSubmit}
              type="submit"
              className="flex w-full px-5 py-1 rounded-xl font-semibold bg-emerald-600 text-white dark:hover:text-green-400"
              title="Add"
              disabled={false}
            />
          </div>
        </form>
      </div>
    </>
  );
}
