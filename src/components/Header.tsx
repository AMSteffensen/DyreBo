import { useState } from "react";
import {
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FiMenu, FiX, FiHome, FiLogOut, FiTool, FiBook } from "react-icons/fi";

const Header = () => {
  const supabase = useSupabaseClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const session = useSession();

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/places">
            <div className="flex items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home mr-2 h-6 w-6"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zm9-2v9h4V7h5l-9-7-9 7h5z" />
              </svg>
              <p className="text-lg font-semibold">Places</p>
            </div>
          </Link>
        </div>
        {/* Hamburger Icon */}
        {session && (
          <div className="flex items-center text-white">
            {isMenuOpen ? (
              <FiX
                className="w-6 h-6 text-white cursor-pointer ml-auto mr-4"
                onClick={toggleMenu}
              />
            ) : (
              <FiMenu
                className="w-6 h-6 text-white cursor-pointer ml-auto mr-4"
                onClick={toggleMenu}
              />
            )}
          </div>
        )}
      </nav>
      {/* Menu */}
      {isMenuOpen && (
        <div
          className={`bg-gray-800 text-white py-4 ${
            isMenuOpen ? "w-full" : "hidden"
          }`}
        >
          <div className="container mx-auto flex flex-col items-center">
            <Link href="/">
              <button
                className="flex items-center mb-2 text-white mx-4"
                onClick={toggleMenu}
              >
                <FiHome className="w-6 h-6 mr-2" />
                Home
              </button>
            </Link>
            <Link href="/add">
              <button
                className="flex items-center mb-2 text-white mx-4"
                onClick={toggleMenu}
              >
                <FiTool className="w-6 h-6 mr-2" />
                Manage
              </button>
            </Link>
            <Link href="/bookings">
              <button
                className="flex items-center mb-2 text-white mx-4"
                onClick={toggleMenu}
              >
                <FiBook className="w-6 h-6 mr-2" />
                Bookings
              </button>
            </Link>
            <button
              className="flex items-center text-white mx-4"
              onClick={() => supabase.auth.signOut()}
            >
              <FiLogOut className="w-6 h-6 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
