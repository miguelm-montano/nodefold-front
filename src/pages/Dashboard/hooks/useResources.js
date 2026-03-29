import { useState, useEffect, useRef } from "react";
import { getResources } from "../../../services/resourceService";

export function useResources({ activeFilter, activeFolderId, search, folders }) {
  const [resources, setResources] = useState([]);
  const [counts, setCounts] = useState({ all: 0, tagged: 0, untagged: 0 });
  const foldersRef = useRef(folders);
  foldersRef.current = folders;

  const fetchResources = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (activeFilter === "tagged") params.tagged = "true";
      if (activeFilter === "untagged") params.tagged = "false";
      const res = await getResources(params);
      if (activeFolderId) {
        const folder = foldersRef.current.find((f) => f.id === activeFolderId);
        const subIds = folder?.folders?.map((s) => s.id) || [];
        const allIds = [activeFolderId, ...subIds];
        setResources(res.data.filter((r) => allIds.includes(r.folder?.id)));
      } else {
        setResources(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch resources", err);
    }
  };

  const fetchCounts = async () => {
    try {
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
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [activeFilter, activeFolderId, search]);

  return { resources, counts, fetchResources, fetchCounts };
}
