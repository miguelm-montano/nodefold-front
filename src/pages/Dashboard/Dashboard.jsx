import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import ResourceGrid from "./components/ResourceGrid";
import AddResourceModal from "./components/AddResourceModal";
import { getFolders } from "../../services/folderService";
import { getResources } from "../../services/resourceService";
import BoxSearch from "../../assets/BoxSearch.svg";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [counts, setCounts] = useState({ all: 0, tagged: 0, untagged: 0 });
  const [search, setSearch] = useState("");
  const [showAddResource, setShowAddResource] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    fetchFolders();
    fetchCounts();
  }, []);

  useEffect(() => {
    fetchResources();
  }, [activeFilter, activeFolderId, search, folders]);

  const fetchFolders = async () => {
    const res = await getFolders();
    setFolders(res.data);
  };

  const fetchCounts = async () => {
    const [all, tagged, untagged] = await Promise.all([
      getResources(),
      getResources({ tagged: "true" }),
      getResources({ tagged: "false" }),
    ]);
    setCounts({
      all: all.data.length,
      tagged: tagged.data.length,
      untagged: untagged.data.length,
    });
  };

  const fetchResources = async () => {
    const params = {};
    if (search) params.search = search;
    if (activeFilter === "tagged") params.tagged = "true";
    if (activeFilter === "untagged") params.tagged = "false";
    const res = await getResources(params);
    // si hay carpeta activa filtra en frontend
    if (activeFolderId) {
      const folder = folders.find((f) => f.id === activeFolderId);
      const subIds = folder?.folders?.map((s) => s.id) || [];
      const allIds = [activeFolderId, ...subIds];
      setResources(res.data.filter((r) => allIds.includes(r.folder?.id)));
    } else {
      setResources(res.data);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setActiveFolderId(null);
  };

  const handleFolderSelect = (id) => {
    setActiveFolderId(id);
    setActiveFilter(null);
  };

  const activeFolder = folders.find((f) => f.id === activeFolderId) || null;
  const isEmpty = resources.length === 0;

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Sidebar
        folders={folders}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onFoldersChange={fetchFolders}
        onFolderSelect={handleFolderSelect}
        activeFolderId={activeFolderId}
        counts={counts}
      />
      <div className="ml-64 flex-1 flex flex-col">
        <DashboardHeader
          activeFolder={activeFolder}
          folders={folders}
          onFolderSelect={setActiveFolderId}
          onSearch={setSearch}
          onAddResource={() => setShowAddResource(true)}
        />
        <main className="flex-1 p-8">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full -mt-10">
              <img
                src={BoxSearch}
                alt="Empty"
                className="w-65 h-65 opacity-50 dark:invert"
              />
              <p className="text-gray-300 text-sm mt-3">
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

      {showAddResource && (
        <AddResourceModal
          folders={folders}
          activeFolderId={activeFolderId}
          onClose={() => setShowAddResource(false)}
          onSuccess={() => {
            fetchResources();
            fetchCounts();
          }}
        />
      )}
    </div>
  );
}
