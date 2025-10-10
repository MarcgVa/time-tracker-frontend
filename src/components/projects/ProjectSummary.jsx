import React from 'react'

export const ProjectSummary = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-5 bg-blue-50">
      <div className="bg-gray-200 p-4 rounded shadow shadow-gray-500">
        <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
        <p className="text-2xl">10</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow shadow-gray-500">
        <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
        <p className="text-2xl">7</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow shadow-gray-500">
        <h3 className="text-lg font-semibold mb-2">Completed Projects</h3>
        <p className="text-2xl">3</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow shadow-gray-500">
        <h3 className="text-lg font-semibold mb-2">Total Hours Logged</h3>
        <p className="text-2xl">120 hrs</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow shadow-gray-500">
        <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
        <p className="text-2xl">$15,000</p>
      </div>
      <div className="bg-gray-200 p-4 rounded shadow shadow-gray-500">
        <h3 className="text-lg font-semibold mb-2">Average Hourly Rate</h3>
        <p className="text-2xl">$125/hr</p>
      </div>
    </div>
  );
}
