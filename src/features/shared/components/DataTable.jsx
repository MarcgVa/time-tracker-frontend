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
    <div className="relative overflow-x-auto">
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-gray-700 dark:border-gray-200">
        <thead className="text-xs text-gray-900 uppercase bg-gray-400  dark:text-gray-600">
          <tr>
            {columns.map((col) => (
              <th scope="col" className="px-6 py-3" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-200 text-gray-600 ">
          {data.map(
            (row) => (
              (
                <tr
                  key={row.key || row.id}
                  className=""
                >
                  {columns.map((col) => (
                    <td
                      scope="row"
                      className="min-w-full flex-row justify-evenly px-6 py-4 font-medium text-gray-600 whitespace-nowrap"
                      key={col}
                    >
                      {row[col]}
                    </td>
                  ))}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
  }
