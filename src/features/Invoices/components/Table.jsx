
export default function Table({data }) {
  return (
    <div className="px-2">
      <div className="mt-8 flow-root">
        <div className="-mx-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                  >
                    Invoice
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Action
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 pr-3 pl-4 text-xs font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white">
                      {item.id}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.total}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.status}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {item.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
