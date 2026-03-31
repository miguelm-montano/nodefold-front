import { useNavigate } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/AuthContext";
import { logout as logoutService } from "../../../services/authService";

export default function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (e) {}
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-8 pt-5 pb-2">
      <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
        Nodefold
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-sm font-semibold text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </header>
  );
}
