import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, ShoppingCart, LogIn, UserPlus, PlusSquare } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLink =
    "flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors";
  const activeLink = "text-indigo-600";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/course" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <BookOpen size={22} />
          LearnHub
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/course"
            className={({ isActive }) =>
              `${navLink} ${isActive ? activeLink : ""}`
            }
          >
            Courses
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${navLink} ${isActive ? activeLink : ""}`
                }
              >
                <ShoppingCart size={16} />
                Cart
              </NavLink>
              <NavLink
                to="/createCourse"
                className={({ isActive }) =>
                  `${navLink} ${isActive ? activeLink : ""}`
                }
              >
                <PlusSquare size={16} />
                Create
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navLink} ${isActive ? activeLink : ""}`
                }
              >
                <LogIn size={16} />
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="flex items-center gap-1.5 text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <UserPlus size={16} />
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
