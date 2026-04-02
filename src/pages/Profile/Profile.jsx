import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useProfile } from "./hooks/useProfile";

import ProfileInfoSection from "./components/ProfileInfoSection";
import SecuritySection from "./components/SecuritySection";
import DeleteAccountSection from "./components/DeleteAccountSection";

import ConfirmDeleteModal from "../Dashboard/components/ConfirmDeleteModal";
import EditProfile from "../../assets/EditProfile.svg";

export default function Profile({ onClose }) {
  const profile = useProfile(onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-950 rounded-2xl shadow-2xl flex overflow-hidden max-h-[90vh]">
        {/* LEFT PANEL */}
        <div className="w-1/2 flex flex-col items-center justify-between py-12 px-10">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Nodefold
          </span>

          <div className="flex flex-col items-center gap-4">
            <img
              src={EditProfile}
              alt="EditProfile"
              className="w-76 h-76 dark:invert -mt-26"
            />
          </div>

          <button
            onClick={profile.handleClose}
            className="flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" strokeWidth={2.5} />
            Back to Dashboard
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end px-6 pt-5">
            <button
              onClick={profile.handleClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="px-8 pb-11 pt-2">
            {/* HEADER */}
            <div className="mb-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Your Profile
              </h1>
            </div>

            {/* FEEDBACK */}
            {profile.saveError && (
              <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {profile.saveError}
              </div>
            )}

            {profile.saveSuccess && (
              <div className="mb-5 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm">
                {profile.saveSuccess}
              </div>
            )}

            {/* SECTIONS */}
            <ProfileInfoSection {...profile} />

            <SecuritySection
              passwords={profile.passwords}
              setPasswords={profile.setPasswords}
              handleSavePassword={profile.handleSavePassword}
            />

            <DeleteAccountSection
              setShowConfirmDelete={profile.setShowConfirmDelete}
            />
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {profile.showConfirmDelete && (
        <ConfirmDeleteModal
          type="own-account"
          onConfirm={profile.handleDeleteAccount}
          onClose={() => profile.setShowConfirmDelete(false)}
        />
      )}
    </div>
  );
}
