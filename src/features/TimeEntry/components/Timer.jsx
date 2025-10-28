import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetProjectsQuery } from "../../Projects/routes/projectsApi";
import { setProject } from "../routes/timeSlice";

export const Timer = ({ getSelectedProject, getTaskInfo }) => {
  const [task, setTask] = useState("");
  const [curProject, setCurProject] = useState();
  const [projects, setProjects] = useState([]);
  const { status, data } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const handleSelection = (e) => {
    setCurProject(e.target.value);
  };

  const handleUpdateTask = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    getSelectedProject(curProject);
    getTaskInfo(task);
  }, [curProject, getSelectedProject, task, getTaskInfo]);

  useEffect(() => {
    if (status === "fulfilled") {
      setProjects(data);
    }
  }, [status, data]);

  useEffect(() => {
    dispatch(setCurProject(undefined));
  }, []);

  return (
    <section>
      <div className="flex flex-col mt-5 ml-10 mr-30 gap-2 items-end">
        <div className="flex flex-col w-75 ">
          <label htmlFor="project-select" className="mb-1">
            Projects
          </label>
          <select
            id="project-select"
            value={curProject}
            onChange={handleSelection}
            className="flex mt-2 bg-gray-700/60 p-3 rounded-lg"
            required
          >
            <option
              value={""}
              className="flex text-xs px-3 py-1 font-light bg-gray-700/60 rounded-lg"
            >
              Select a Project
            </option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-75">
          <label htmlFor="notes" className="mt-2 mb-1">
            Task
          </label>
          <input
            id="notes"
            type="text"
            value={task}
            onChange={handleUpdateTask}
            className="px-3 py-2 bg-gray-700/60 rounded-lg"
            required
          />
        </div>
      </div>
    </section>
  );
};
