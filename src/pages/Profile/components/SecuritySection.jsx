import PasswordField from "./PasswordField";

export default function SecuritySection({
  passwords,
  setPasswords,
  handleSavePassword,
}) {
  return (
    <>
      <div className="border-t border-gray-200 dark:border-gray-800 mb-6" />

      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Account Security
          </h2>
          <p className="text-sm text-black dark:text-white">
            Ensure your account is using a long, random password to stay secure
          </p>
        </div>

        <form onSubmit={handleSavePassword} className="flex flex-col gap-3">
          <PasswordField
            label="Current Password"
            placeholder="••••••••"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />

          <PasswordField
            label="New Password"
            placeholder="••••••••"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
          />

          <PasswordField
            label="Confirm Password"
            placeholder="••••••••"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />

          <div className="pt-1">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-4xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
