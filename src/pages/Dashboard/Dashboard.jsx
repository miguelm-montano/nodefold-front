import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { getFolders } from "../../services/folderService";
import { getResources } from "../../services/resourceService";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [counts, setCounts] = useState({ all: 0, tagged: 0, untagged: 0 });

  useEffect(() => {
    fetchFolders();
    fetchCounts();
  }, []);

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

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Sidebar
        folders={folders}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onFoldersChange={fetchFolders}
        onFolderSelect={setActiveFolderId}
        activeFolderId={activeFolderId}
        counts={counts}
      />
      <main className="ml-64 flex-1 p-8">
        <p className="text-gray-400">
          Select a folder or filter to see resources
        </p>
      </main>
    </div>
  );
}
