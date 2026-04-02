import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "../../Dashboard/components/ConfirmDeleteModal";

export default function AdminsTable({ admins, onDelete }) {
  const [deleteModal, setDeleteModal] = useState(null);

  return (
    <div className="min-h-66 max-h-66 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 shrink-0">
        All admins
      </h3>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="pb-2 pl-2 font-medium">Name</th>
              <th className="pb-2 pl-2 font-medium">Date</th>
              <th className="pb-2 pl-2 font-medium">Email</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="group">
                <td
                  className="py-2 px-2 font-medium text-gray-900 dark:text-white 
                  group-hover:bg-gray-50 dark:group-hover:bg-gray-800 
                  first:rounded-l-lg"
                >
                  {admin.name}
                </td>

                <td
                  className="py-2 px-2 text-gray-500 dark:text-gray-400 
                  group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
                >
                  {new Date(admin.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td
                  className="py-2 px-2 text-gray-500 dark:text-gray-400 
                  group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
                >
                  {admin.email}
                </td>

                <td
                  className="py-2 
                  group-hover:bg-gray-50 dark:group-hover:bg-gray-800 
                  last:rounded-r-lg"
                >
                  <button
                    onClick={() => setDeleteModal(admin)}
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
          type="user"
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
