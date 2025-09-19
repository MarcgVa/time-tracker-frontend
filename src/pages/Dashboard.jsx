import { useEffect, useState } from "react";
import {
  useCreateProjectMutation,
  useGetProjectsQuery,
} from "../features/projects/projectsApi";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const { status, data, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [projects, setProjects] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hourlyRate: 0,
  });

  useEffect(() => {
    if (status == "fulfilled") {
      setProjects(data);
    }
  }),
    [status, data];

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
      <div className="flex min-h-10 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-gray-300">
            Project Dashboard
          </h2>
        </div>

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
              <button
                type="submit"
                className="flex w-full border px-5 py-1 rounded-xl font-semibold border-green-600 text-emerald-600 dark:border-green-600 dark:text-green-600 dark:hover:border-green-400 dark:hover:text-green-400 hover:border-gray-800 hover:text-gray-800"
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <div
          className="mt-10 w-full border border-gray-400 p-3 mx-auto justify-center items-center min-h-200 rounded
          dark:text-gray-400              
          ">
          {isLoading ? (
            <p>Loading projects</p>
          ) : (
            <ul className="mt-2 space-y-6 space-x-8">
              {projects?.map((p) => (
                <li key={p.id} className="">
                  <a href={`/projects/${p.id}`} className="font-bold text-indigo-700 dark:text-indigo-500 cursor-pointer ">
                    {p.name}
                  </a>
                  <p className="mx-10">{p.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
