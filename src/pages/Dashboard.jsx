import { useState } from 'react';
import { useCreateProjectMutation, useGetProjectsQuery } from '../features/projects/projectsApi'; 

export default function Dashboard() {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
    <div className='flex-col min-h-200'>
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-shadow-amber-600 text-shadow-blue-500">Project Dashboard</h1>
      <form onSubmit={handleSubmit} className="mx-5 items-center flex justify-center">
        <input
          type="text"
          placeholder="Project Name"
          onChange={handleUpdate}
          className="border m-4 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleUpdate}
          className="border m-4 rounded"
        />
        <input
          type="number"
          placeholder="Hourly Rate"
          onChange={handleUpdate}
          className="border m-4 rounded"
        />

        <button className="bg-green-600 text-white px-4 rounded">Add</button>
      </form>
      
      <div className="border p-2 mx-5 justify-center items-center min-h-200 max-w-500px rounded">
        {isLoading ? (
          <p>Loading projects</p>
        ) : (
          <ul>
            {projects.map((p) => (
              <li key={p.id} className="proj-list">
                <a href={`/projects/${p.id}`} className="font-bold ">
                  {p.name}
                </a>
                <p className="mx-10">{p.description}</p>
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
}
