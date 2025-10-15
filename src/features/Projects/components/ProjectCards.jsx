import React, { useState, useEffect } from "react";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../routes/projectsApi";
import { Card } from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ProjectCards = () => {
  const { status, data, isLoading } = useGetProjectsQuery();
  const [projects, setProjects] = useState([]);
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = async (e, id) => {
    e.stopPropagation();

    const data = { projectId: id };
    try {
      await deleteProject(data).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (status == "fulfilled") {
      setProjects(data);
    }
  }, [status, data]);

  return (
    <section className="flex-grow g-gray-900 border-t border-gray-800 py-5">
      <div className="mx:auto grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 py-5 px-2 gap-4 min-h-90 max-w-8xl overflow-y-auto bg-gray-800/50">
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
                location={`/projects/${item.id}`}
                isCompleted={item.isCompleted}
              >
                <Button
                  onClick={(event) => {
                    handleDeleteProject(event, item.id);
                  }}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                  className={
                    "hover:text-gray-800 hover:scale-150 transition-transform ease-in-out duration-200 text-xs px-2 cursor-pointer z-100 text-red-900"
                  }
                />
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
};
