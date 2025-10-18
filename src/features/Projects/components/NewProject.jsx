import React,{useState} from 'react'
import { useCreateProjectMutation } from '../routes/projectsApi';
import Button from '../../Shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export const NewProject = ({handleUpdate, data}) => {

  return (
    <div className="p-4 text-white">
      <div className="flex mx-auto">
        <form method="submit" className="flex gap-5 justify-evenly items-center">
          <div className="flex">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Project Name"
              value={data.name}
              onChange={handleUpdate}
              autoComplete="projectName"
              className="mx-2 px-2 py-0.5 bg-blue-900/60  rounded-lg"
            />
          </div>
          <div className="flex">
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={data.description}
              onChange={handleUpdate}
              autoComplete="description"
              className="mx-2 px-2 py-0.5 bg-blue-900/60  rounded-lg"
            />
          </div>
          <div className="flex">
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              placeholder="Due Date"
              value={data.dueDate}
              onChange={handleUpdate}
              autoComplete="dueDate"
              className="mx-2 px-2 py-0.5 bg-blue-900/60  rounded-lg"
            />
          </div>
          <div className="flex">
            <input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              placeholder="Hourly Rate"
              value={data.hourlyRate}
              onChange={handleUpdate}
              autoComplete="hourlyRate"
              className="mx-2 px-2 py-0.5 bg-blue-900/60  rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
