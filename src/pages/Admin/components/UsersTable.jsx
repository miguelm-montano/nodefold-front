import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "../../Dashboard/components/ConfirmDeleteModal";

export default function UsersTable({ users, onDelete, onUserClick }) {
  const [deleteModal, setDeleteModal] = useState(null);

  return (
    <div className="min-h-84 max-h-84 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        All users
      </h3>
      <div className="overflow-y-auto max-h-72">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="pb-2 pl-2 font-medium">Name User</th>
              <th className="pb-2 pl-2 font-medium">Date Register</th>
              <th className="pb-2 pl-2 font-medium">Folders</th>
              <th className="pb-2 pl-2 font-medium">Resources</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => onUserClick(user)}
                className="cursor-pointer group"
              >
                <td
                  className="py-2 px-2 font-medium text-gray-900 dark:text-white 
                     group-hover:bg-gray-50 dark:group-hover:bg-gray-800 
                     first:rounded-l-lg"
                >
                  {user.name}
                </td>

                <td
                  className="py-2 px-2 text-gray-500 dark:text-gray-400 
                     group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
                >
                  {new Date(user.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td
                  className="py-2 px-2 text-gray-500 dark:text-gray-400 
                     group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
                >
                  {user.folders_count ?? "—"}
                </td>

                <td
                  className="py-2 px-2 text-gray-500 dark:text-gray-400 
                     group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
                >
                  {user.resources_count ?? "—"}
                </td>

                <td
                  className="py-2 
                     group-hover:bg-gray-50 dark:group-hover:bg-gray-800 
                     last:rounded-r-lg"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModal(user);
                    }}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteModal && (
        <ConfirmDeleteModal
          type="resource"
          name={deleteModal.name}
          onConfirm={async () => {
            await onDelete(deleteModal.id);
            setDeleteModal(null);
          }}
          onClose={() => setDeleteModal(null)}
        />
      )}
    </div>
  );
}
