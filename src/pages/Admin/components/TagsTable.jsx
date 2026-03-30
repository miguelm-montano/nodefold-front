export default function TagsTable({ tags }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        All tags registered
      </h3>
      <div className="overflow-y-auto max-h-72">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="pb-3 font-medium w-12">#</th>
              <th className="pb-3 font-medium">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {tags?.map((tag, i) => (
              <tr
                key={tag.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 text-gray-400">{i + 1}</td>
                <td className="py-3 text-gray-900 dark:text-white">
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
