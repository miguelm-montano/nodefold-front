import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "./hooks/useAdmin";
import Profile from "../Profile/Profile";
import AdminHeader from "./components/AdminHeader";
import StatsCard from "./components/StatsCard";
import UsersTable from "./components/UsersTable";
import AdminsTable from "./components/AdminsTable";
import TagsTable from "./components/TagsTable";
import StatsRatioCard from "./components/StatsRatioCard";
import TopTagsCard from "./components/TopTagsCard";
import AdminProfileCard from "./components/AdminProfileCard";
import CalendarCard from "./components/CalendarCard";
import FolderStatsSvg from "../../assets/Folder-stats.svg";
import UsertatsSvg from "../../assets/User-stats.svg";
import TagStatsSvg from "../../assets/Tag-stats.svg";
import ResourceStatsSvg from "../../assets/Resource-stats.svg";

export default function Admin() {
  const { stats, users, admins, loading, user, handleDeleteUser } = useAdmin();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const resourcesPerUser =
    stats && stats.total_users
      ? (stats.total_resources / stats.total_users).toFixed(1)
      : "—";

  const foldersPerUser =
    stats && stats.total_users
      ? (stats.total_folders / stats.total_users).toFixed(1)
      : "—";

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      <AdminHeader />

      <div className="max-w-screen-2xl mx-auto px-12 pt-4 pb-7 space-y-8 bg-white dark:bg-gray-950 rounded-4xl">
        {/* Welcome */}
        <h1 className="text-3xl font-bold mt-2 mb-6">
          Welcome back, {user?.name}!
        </h1>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-12 mb-6">
          <StatsCard
            title="Total Users"
            value={stats?.total_users}
            icon={
              <img
                src={UsertatsSvg}
                alt="UserStats"
                className="w-16 h-16 dark:invert"
              />
            }
          />
          <StatsCard
            title="Total Folders"
            value={stats?.total_folders}
            icon={
              <img
                src={FolderStatsSvg}
                alt="FolderStats"
                className="w-15 h-15 dark:invert"
              />
            }
          />
          <StatsCard
            title="Total Resources"
            value={stats?.total_resources}
            icon={
              <img
                src={ResourceStatsSvg}
                alt="ResourceStats"
                className="w-13 h-13 dark:invert"
              />
            }
          />
          <StatsCard
            title="Total Tags"
            value={stats?.total_tags}
            icon={
              <img
                src={TagStatsSvg}
                alt="TagsStats"
                className="w-16 h-16 dark:invert"
              />
            }
          />
        </div>

        {/* General Dashboard */}
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
          Overview
        </h2>

        {/* Grid principal */}
        <div className="grid grid-cols-12 gap-4">
          {/* Users + Admins — col 1-5 */}
          <div className="col-span-5 space-y-4">
            <UsersTable
              users={users}
              onDelete={handleDeleteUser}
              onUserClick={setSelectedUser}
            />
            <AdminsTable admins={admins} onDelete={handleDeleteUser} />
          </div>

          {/* Tags — col 6-8 */}
          <div className="col-span-3 h-154">
            <TagsTable tags={stats?.tags} />
          </div>

          {/* Columna derecha — col 9-12 */}
          <div className="col-span-4 grid grid-cols-2 grid-rows-[10rem_10rem_16.5rem] gap-4">
            {/* Fila 1 izquierda */}
            <StatsRatioCard
              title="Resources/Users"
              subtitle="Avg. resources per registered user"
              value={resourcesPerUser}
            />

            {/* TopTagsCard ocupa filas 1 y 2 en columna derecha */}
            <div className="row-span-2">
              <TopTagsCard tags={stats?.tags} />
            </div>

            {/* Fila 2 izquierda */}
            <StatsRatioCard
              title="Folders/Users"
              subtitle="Avg. folders per registered user"
              value={foldersPerUser}
            />

            {/* Fila 3 izquierda */}
            <CalendarCard />

            {/* Fila 3 derecha */}
            <div className="flex flex-col gap-4 h-full">
              <AdminProfileCard
                user={user}
                onProfileClick={() => setShowProfile(true)}
              />
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </div>
  );
}
