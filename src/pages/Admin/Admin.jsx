import { useState } from "react";
import useAdmin from "./hooks/useAdmin";
import AdminHeader from "./components/AdminHeader";
import StatsCard from "./components/StatsCard";
import UsersTable from "./components/UsersTable";
import AdminsTable from "./components/AdminsTable";
import TagsTable from "./components/TagsTable";
import StatsRatioCard from "./components/StatsRatioCard";
import TopTagsCard from "./components/TopTagsCard";
import AdminProfileCard from "./components/AdminProfileCard";
import CalendarCard from "./components/CalendarCard";

export default function Admin() {
  const { stats, users, admins, loading, user, handleDeleteUser } = useAdmin();
  const [selectedUser, setSelectedUser] = useState(null);

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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <AdminHeader />

      <div className="max-w-screen-2xl mx-auto px-8 py-2 space-y-8">
        {/* Welcome */}
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatsCard title="Total Users" value={stats?.total_users} icon="👤" />
          <StatsCard
            title="Total Folders"
            value={stats?.total_folders}
            icon="📁"
          />
          <StatsCard
            title="Total Resources"
            value={stats?.total_resources}
            icon="🖼"
          />
          <StatsCard title="Total Tags" value={stats?.total_tags} icon="🏷" />
        </div>

        {/* General Dashboard */}
        <h2 className="text-lg font-semibold text-gray-400">
          General Dashboard
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
          <div className="col-span-3">
            <TagsTable tags={stats?.tags} />
          </div>

          {/* Columna derecha — col 9-12 */}
          <div className="col-span-4 grid grid-cols-2 grid-rows-[auto_auto_auto] gap-4">
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
            <AdminProfileCard user={user} onProfileClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
