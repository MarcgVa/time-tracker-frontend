import React, { Component } from 'react'


// Usage: <DataTable columns={['Name', 'Age', 'Email']} data={[{Name: 'Alice', Age: 25, Email: 'alice@example.com'}, ...]} />
/**
 * Props:
 * - columns: array of column names
 * - data: array of row objects
 * - renderData: optional function(row, col, rowIdx) => ReactNode
 */
export default function DataTable({columns=[], data=[],}) {

  return (
    <div className="relative w-full h-full border border-yellow-200  overflow-x-auto">
      <div className='border-8 border-teal-300'>
        <table className="grid grid-cols-4mx-auto my-auto ">
          <thead className="">
            <tr>
              {columns?.map((col) => (
                <th
                  scope="col"
                  className="px-6 py-3 text-white/60 text-md font-light"
                  key={col.id}
                >
                  {col.col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="grid grid-cols-4 @sm:grid-cols-4 bg-blue-900/30 gap-3 text-white text-sm text-center">
            {data.map((row) => (
              <tr key={row.key || row.name} className="flex ">
                {columns?.map((col) => (
                  <td
                    scope="row"
                    className="mb-2 px-6 py-4 font-light text-sm text-white bg-gray-900/90 whitespace-nowrap"
                    key={col.id}
                  >
                    {row[col.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
