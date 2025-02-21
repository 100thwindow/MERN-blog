// import { Link } from "react-router-dom";
// import { useState } from "react";
// import DarkModeToggle from "./DarkModeToggle";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-white shadow-md p-4 dark:bg-gray-900">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-3xl font-bold ml-8 text-gray-800 dark:text-white"
//         >
//           My Blog
//         </Link>
//         <div>
//           {user ? (
//             <>
//               <span className="mr-4">Hello, {user.username}</span>{" "}
//               {/* Display username */}
//               <button
//                 onClick={logout}
//                 className="bg-red-800 px-3 py-1 rounded  cursor-pointer"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="mr-4">
//                 Login
//               </Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </div>

//         <DarkModeToggle />

//         {/* Menu Items - Desktop */}
//         <div className="hidden md:flex space-x-6 mr-18">
//           <Link
//             to="/"
//             className="text-gray-700 hover:text-blue-500 dark:text-white"
//           >
//             Home
//           </Link>
//           <Link
//             to="/create"
//             className="text-gray-700 hover:text-blue-500 dark:text-white"
//           >
//             Create Post
//           </Link>
//           <Link
//             to="/about"
//             className="text-gray-700 hover:text-blue-500 dark:text-white"
//           >
//             About
//           </Link>
//         </div>

//         {/* Hamburger Menu - Mobile */}
//         <button
//           className="md:hidden text-gray-700 focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white mt-2 p-4 shadow-md rounded-lg">
//           <Link
//             to="/"
//             className="block py-2 text-gray-700 hover:text-blue-500"
//             onClick={() => setIsOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/create"
//             className="block py-2 text-gray-700 hover:text-blue-500"
//             onClick={() => setIsOpen(false)}
//           >
//             Create Post
//           </Link>
//           <Link
//             to="/about"
//             className="block py-2 text-gray-700 hover:text-blue-500"
//             onClick={() => setIsOpen(false)}
//           >
//             About
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-white text-2xl font-bold cursor-pointer"
            >
              BlogApp
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-4 ml-10">
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 cursor-pointer"
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/create"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 cursor-pointer"
                >
                  Create Post
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Dark mode toggle and Auth buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle with Text */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white rounded-lg transition duration-150 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <>
                  <FaSun className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    Turn the lights on
                  </span>
                </>
              ) : (
                <>
                  <FaMoon className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    Turn the lights off
                  </span>
                </>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center cursor-pointer">
                  <span className="text-gray-300 text-sm mr-2 hidden sm:inline">
                    Welcome, {user.username}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
                    <span className="text-white text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 cursor-pointer"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/create"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
            >
              Create Post
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
