import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../routes/projects/projectsApi";
import PageTitle from "../components/shared/PageTitle";
import { NewTimeEntry } from "../components/TimeEntry/NewTimeEntry";
import { ProjectLineItems } from "../components/projects/ProjectLineItems";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const { status, data } = useGetProjectQuery(id);
  
  useEffect(() => {
    if (status == "fulfilled") {
      setProject(data);
    }
  }, [status, data]);
  
  return (
    <div className="flex min-h-10 flex-col justify-center px-6 lg:px-8">
      <PageTitle title={project?.name || "Project Details"} />
      <NewTimeEntry projectId={id} />
      <ProjectLineItems projectId={id} />
    </div>
  );
}
