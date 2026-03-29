export default function DeleteAccountSection({ setShowConfirmDelete }) {
  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-800 mb-6" />

      <section>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Delete Account
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Once your account is deleted, all data will be permanently removed.
          </p>
        </div>

        <button
          onClick={() => setShowConfirmDelete(true)}
          className="px-6 py-2.5 rounded-4xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </section>
    </>
  );
}
