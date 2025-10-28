import React, { useState } from "react";
import { Timer } from "../components/Timer";
import { ActivityList } from "../components/ActivityList";
import { Stopwatch } from "../components/Stopwatch";
export const TimeEntryPage = () => {

  const [selectedProject, setSelectedProject] = useState();
  const [task, setTask] = useState();

  const getSelectedProject = (project) => {
    console.log('project', project);
    setSelectedProject(project);
  }

  const getTaskInfo = (title) => {
    console.log('task', title);
    setTask(title);
  }

  return (
    <>
      <div className="relative w-full h-full flex flex-col justify-start text-white">
        <h1 className="mt-8 ml-7 text-white text-4xl font-semibold ">
          Time Tracker
        </h1>
        <Stopwatch project={selectedProject} task={task} />
        <Timer
          getSelectedProject={getSelectedProject}
          getTaskInfo={getTaskInfo}
        />
        <ActivityList id={selectedProject} />
      </div>
    </>
  );
};
