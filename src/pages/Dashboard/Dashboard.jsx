import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import ResourceGrid from "./components/ResourceGrid";
import AddResourceModal from "./components/AddResourceModal";
import { getFolders } from "../../services/folderService";
import BoxSearch from "../../assets/BoxSearch.svg";
import ResourcePanel from "./components/ResourcePanel";
import Profile from "../Profile/Profile";
import { useResources } from "./hooks/useResources";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddResource, setShowAddResource] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const { resources, counts, fetchResources, fetchCounts } = useResources({
    activeFilter,
    activeFolderId,
    search,
    folders,
  });

  const fetchFolders = async () => {
    try {
      const res = await getFolders();
      setFolders(res.data);
    } catch (err) {
      console.error("Failed to fetch folders", err);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchCounts();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setActiveFolderId(null);
  };

  const handleFolderSelect = (id) => {
    setActiveFolderId(id);
    setActiveFilter(null);
    setSelectedResource(null);
  };

  const activeFolder = folders.find((f) => f.id === activeFolderId) || null;
  const isEmpty = resources.length === 0;

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Sidebar
        folders={folders}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onFoldersChange={() => {
          fetchFolders();
          fetchResources();
          fetchCounts();
        }}
        onShowProfile={() => setShowProfile(true)}
        onFolderSelect={handleFolderSelect}
        activeFolderId={activeFolderId}
        counts={counts}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          selectedResource ? "ml-64 mr-80" : "ml-64"
        }`}
      >
        <DashboardHeader
          activeFolder={activeFolder}
          folders={folders}
          onFolderSelect={setActiveFolderId}
          onSearch={setSearch}
          onAddResource={() => setShowAddResource(true)}
        />
        <main className="flex-1 p-8">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full -mt-14">
              <img
                src={BoxSearch}
                alt="Empty"
                className="w-65 h-65 dark:invert"
              />
              <p className="text-gray-400 text-sm mt-3">
                Start by creating a folder and uploading your files
              </p>
            </div>
          ) : (
            <ResourceGrid
              resources={resources}
              onResourceClick={setSelectedResource}
            />
          )}
        </main>
      </div>

      {selectedResource && (
        <ResourcePanel
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onDelete={() => {
            setSelectedResource(null);
            fetchResources();
            fetchCounts();
            fetchFolders();
          }}
          onEdit={(updatedResource) => {
            setSelectedResource(updatedResource);
            fetchResources();
            fetchCounts();
          }}
        />
      )}

      {showAddResource && (
        <AddResourceModal
          folders={folders}
          activeFolderId={activeFolderId}
          onClose={() => setShowAddResource(false)}
          onSuccess={() => {
            fetchResources();
            fetchCounts();
            fetchFolders();
          }}
        />
      )}

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </div>
  );
}
