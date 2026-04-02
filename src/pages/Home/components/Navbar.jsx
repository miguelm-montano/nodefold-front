import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { logout as logoutService } from "../../../services/authService";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (e) {
      // si el token ya expiró, ignoramos el error
    }
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="text-xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            Nodefold
          </Link>

          {/* Nav links — solo en home */}
          {isHome && !isAuthenticated && (
            <div className="flex items-center gap-18">
              <a
                href="#features"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-works"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                How it works
              </a>
              <a
                href="#workspace"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Workspace
              </a>
            </div>
          )}

          {/* Acciones */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-4xl hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-4xl hover:opacity-90 transition-opacity"
                >
                  Sing In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
