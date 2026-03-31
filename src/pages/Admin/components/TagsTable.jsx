export default function TagsTable({ tags }) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 shrink-0">
        All tags registered
      </h3>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm border-separate border-spacing-y-1">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="pb-3 pl-4 font-medium w-12">#</th>
              <th className="pb-3 pl-4 font-medium">Name</th>
            </tr>
          </thead>

          <tbody>
            {tags?.map((tag, i) => (
              <tr key={tag.id} className="group">
                <td
                  className="py-3 pl-4 text-gray-400 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 
                             first:rounded-l-lg"
                >
                  {i + 1}
                </td>

                <td
                  className="py-3 pl-4 text-gray-900 dark:text-white 
                             group-hover:bg-gray-50 dark:group-hover:bg-gray-800 
                             last:rounded-r-lg"
                >
                  {tag.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
