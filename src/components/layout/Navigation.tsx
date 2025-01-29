import { Link } from "react-router-dom";
import { useAccessTokenContext } from "../../utils/AuthProvider";
import SearchForm from "../Forms/SearchForm";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUpload,
  faBook,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";

const Navigation = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const [isOpen, setIsOpen] = useState(false);
  const { postData } = useFetch();

  const handleSignout = () => {
    postData("accounts/auth/logout/", {});
    setAccessToken(null);
  };

  return (
    <nav className="flex md:justify-between p-4 flex-col overflow-hidden border-[1px]">
      {/* Navigations */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <ul
        className={`md:flex gap-4 flex-col md:flex-row md:justify-between md:items-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-2">
          <li>
            <Link to="/" className="text-2xl">
              <b>RELIGHT</b>
            </Link>
          </li>
          <li className="font-semibold flex md:justify-center items-center gap-1">
            <FontAwesomeIcon icon={faBook} />
            <Link to="/library">Library</Link>
          </li>
          <li className="font-semibold flex md:justify-center items-center gap-1">
            <FontAwesomeIcon icon={faUpload} />
            <Link to="/addbook">Add Book</Link>
          </li>
          <li className="font-semibold flex md:justify-center items-center gap-1">
            <FontAwesomeIcon icon={faGlobe} />
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <SearchForm />
          </li>
        </div>
        <div className="flex gap-8 my-2">
          <Link to="/login">
            <button
              onClick={accessToken ? () => handleSignout() : undefined}
              className="py-1 px-4 rounded-xl bg-primaryRed text-white hover:-translate-y-1 hover:shadow-sm hover:shadow-gray-800"
            >
              {accessToken ? "Sign out" : "Sign in"}
            </button>
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
