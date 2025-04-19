import { Link, useLocation } from "react-router-dom";
import { useAccessTokenContext } from "../../pages/Auth/AuthProvider";
import SearchForm from "../Forms/SearchForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUpload,
  faBook,
  faGlobe,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useAuthFetch from "../../hooks/useAuthFetch";
import DarkModeToggle from "../UI/DarkModeToggle";

const Navigation = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const [isOpen, setIsOpen] = useState(false);
  // New state to control animation for the overlay
  const [animateOverlay, setAnimateOverlay] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { signOutUser } = useAuthFetch();
  const location = useLocation();

  const handleSignout = async () => {
    await signOutUser();
    setAccessToken(null);
  };

  const openOverlay = () => {
    setIsOpen(true);
    // Delay to ensure DOM is mounted before triggering transition
    setTimeout(() => setAnimateOverlay(true), 10);
  };

  const closeOverlay = () => {
    // Start exit animation
    setAnimateOverlay(false);
    // After animation duration, unmount overlay
    setTimeout(() => setIsOpen(false), 500);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex shrink justify-between p-4 overflow-hidden shadow-sm drop-shadow-md bg-transparent">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="text-2xl hover:text-primaryRed transition-all duration-500 ease-in-out"
          >
            <b>RELIGHT</b>
          </Link>
          <ul className="flex gap-4 items-center shrink">
            <li
              className={`${
                location.pathname === "/library" ? "bg-primaryRed" : undefined
              } font-semibold flex items-center gap-1 hover:bg-primaryRed rounded-lg px-4 py-1 transition-all duration-500 ease-in-out`}
            >
              <FontAwesomeIcon icon={faBook} />
              <Link to="/library">Library</Link>
            </li>
            <li
              className={`${
                location.pathname === "/addbook" ? "bg-primaryRed" : undefined
              } font-semibold flex items-center gap-1 hover:bg-primaryRed rounded-lg px-4 py-1 transition-all duration-500 ease-in-out`}
            >
              <FontAwesomeIcon icon={faUpload} />
              <Link to="/addbook">Add Book</Link>
            </li>
            <li
              className={`${
                location.pathname === "/browse" ? "bg-primaryRed" : undefined
              } font-semibold flex items-center gap-1 hover:bg-primaryRed rounded-lg px-4 py-1 transition-all duration-500 ease-in-out`}
            >
              <FontAwesomeIcon icon={faGlobe} />
              <Link to="/browse">Browse</Link>
            </li>
            {showSearch ? (
              <div className="flex-auto">
                <SearchForm />
              </div>
            ) : (
              <li
                onClick={() => setShowSearch(true)}
                className="font-semibold flex items-center gap-1 hover:bg-primaryRed rounded-lg px-4 py-1 transition-all duration-500 ease-in-out"
              >
                <FontAwesomeIcon icon={faSearch} />
                <p>Search</p>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-8 shrink">
          <DarkModeToggle />
          <Link to="/login">
            <button
              onClick={accessToken ? handleSignout : undefined}
              className="py-1 px-4 rounded-xl bg-primaryRed text-white hover:bg-primaryRed/80"
            >
              {accessToken ? "Sign out" : "Sign in"}
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden p-4 shadow-sm drop-shadow-md flex justify-between items-center">
        <Link to="/" className="text-2xl hover:text-primaryRed">
          <b>RELIGHT</b>
        </Link>
        <button onClick={openOverlay}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      {isOpen && (
        <div
          className={`md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col transition-transform duration-500 ease-in-out ${
            animateOverlay ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-primaryRed">
            <Link
              to="/"
              onClick={closeOverlay}
              className="text-2xl hover:text-primaryRed"
            >
              <b>RELIGHT</b>
            </Link>
            <button onClick={closeOverlay} className="focus:outline-none">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
          {/* Navigation Column - Left Aligned */}
          <div className="py-6 px-4">
            <ul className="flex flex-col gap-4 items-start">
              <li className="flex items-center font-semibold hover:text-primaryRed gap-4">
                <span className="w-12 flex-shrink-0 text-center">
                  <FontAwesomeIcon icon={faBook} size="lg" />
                </span>
                <Link to="/library" onClick={closeOverlay}>
                  Library
                </Link>
              </li>
              <li className="flex items-center font-semibold hover:text-primaryRed gap-4">
                <span className="w-12 flex-shrink-0 text-center">
                  <FontAwesomeIcon icon={faUpload} size="lg" />
                </span>
                <Link to="/addbook" onClick={closeOverlay}>
                  Add Book
                </Link>
              </li>
              <li className="flex items-center font-semibold hover:text-primaryRed gap-4">
                <span className="w-12 flex-shrink-0 text-center">
                  <FontAwesomeIcon icon={faGlobe} size="lg" />
                </span>
                <Link to="/browse" onClick={closeOverlay}>
                  Browse
                </Link>
              </li>
              <li className="flex items-center font-semibold hover:text-primaryRed gap-4">
                <span className="w-12 flex-shrink-0 text-center">
                  <DarkModeToggle />
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Light Theme / Dark Theme
                </span>
              </li>
            </ul>
          </div>
          {/* Search Button / Form */}
          <div className="px-4 mb-4">
            {showSearch ? (
              <SearchForm />
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="w-full py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </button>
            )}
          </div>
          {/* Sign In/Out Button */}
          <div className="px-4">
            <Link to="/login" onClick={closeOverlay}>
              <button
                onClick={accessToken ? handleSignout : undefined}
                className="w-full py-2 rounded-xl bg-primaryRed text-white hover:bg-primaryRed/80"
              >
                {accessToken ? "Sign out" : "Sign in"}
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
