import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../routes/projectsApi";
import { StartTimeEntry } from "../components/StartTImeEntry";
import { ProjectLineItems } from "../components/ProjectLineItems";

export default function ProjectDetailsPage() {
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
      <StartTimeEntry projectId={id} />
      <ProjectLineItems projectId={id} />
    </div>
  );
}
