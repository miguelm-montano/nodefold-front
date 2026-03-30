import { useState, useEffect } from "react";
import { getUsers, getStats, deleteUser } from "../../../services/adminService";
import { useAuth } from "../../../context/AuthContext";

export default function useAdmin() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, adminsRes] = await Promise.all([
        getStats(),
        getUsers({ role: "user" }),
        getUsers({ role: "admin" }),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setAdmins(adminsRes.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchAll();
  };

  return { stats, users, admins, loading, user, handleDeleteUser, fetchAll };
}
