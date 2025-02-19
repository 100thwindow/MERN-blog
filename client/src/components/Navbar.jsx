import { Link } from "react-router-dom";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold ml-8 text-gray-800 dark:text-white"
        >
          My Blog
        </Link>

        <DarkModeToggle />

        {/* Menu Items - Desktop */}
        <div className="hidden md:flex space-x-6 mr-18">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 dark:text-white"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="text-gray-700 hover:text-blue-500 dark:text-white"
          >
            Create Post
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-500 dark:text-white"
          >
            About
          </Link>
        </div>

        {/* Hamburger Menu - Mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white mt-2 p-4 shadow-md rounded-lg">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/create"
            className="block py-2 text-gray-700 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Create Post
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
