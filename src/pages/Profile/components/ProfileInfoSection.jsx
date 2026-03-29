import EditableField from "./EditableField";

export default function ProfileInfoSection({ name, email, handleSaveField }) {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Profile Information
        </h2>
        <p className="text-sm text-black dark:text-white mb-6">
          Update your account's profile information
        </p>
      </div>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-lg font-semibold text-gray-500 dark:text-white">
            {name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>

        {/* Fields */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          <EditableField
            label="Name"
            value={name}
            onSave={(val) => handleSaveField("name", val)}
          />
          <EditableField
            label="Email"
            value={email}
            type="email"
            onSave={(val) => handleSaveField("email", val)}
          />
        </div>
      </div>
    </section>
  );
}
