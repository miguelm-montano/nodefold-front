import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DeleteSvg from "../../../assets/Delete.svg";

export default function ConfirmDeleteModal({ type, name, onConfirm, onClose }) {
  const isFolder = type === "folder";
  const isUser = type === "user";

  const message = isFolder
    ? "This folder and all resources will be permanently removed"
    : isUser
      ? "The account will be permanently removed"
      : "The resource will be permanently removed";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 shadow-xl p-6">
        {/* Icono */}
        <div className="flex items-center justify-center mx-auto mb-4">
          <img src={DeleteSvg} alt="Delete" className="w-14 h-14 dark:invert" />
        </div>

        {/* Texto */}
        <div className="text-center mb-6">
          {isUser ? (
            <>
              <h2 className="text-base font-semibold dark:text-white mb-1">
                Are you sure you want to delete
              </h2>
              {name && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {name}'s account?
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-base font-semibold dark:text-white mb-1">
                Are you sure you want to delete:
              </h2>
              {name && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  "{name}"
                </p>
              )}
            </>
          )}
          <p className="text-sm text-gray-400 dark:text-gray-500">{message}</p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-4xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-4xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
