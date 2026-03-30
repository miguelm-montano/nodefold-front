import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "../../Dashboard/components/ConfirmDeleteModal";

export default function AdminsTable({ admins, onDelete }) {
  const [deleteModal, setDeleteModal] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        All admins
      </h3>
      <div className="overflow-y-auto max-h-72">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 text-gray-900 dark:text-white font-medium">
                  {admin.name}
                </td>
                <td className="py-3 text-gray-500 dark:text-gray-400">
                  {new Date(admin.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 text-gray-500 dark:text-gray-400">
                  {admin.email}
                </td>
                <td className="py-3">
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
