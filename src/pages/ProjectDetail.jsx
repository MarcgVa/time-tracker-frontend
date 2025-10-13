import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../routes/projects/projectsApi";
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
    <div className="h-lvh max-h-lvh flex flex-col mt-12">
      <NewTimeEntry projectId={id} />
      <ProjectLineItems projectId={id} />
    </div>
  );
}
