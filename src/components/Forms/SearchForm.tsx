import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/?query=${query}&page_size=10`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <button className="bg-primaryRed px-2 rounded-l-md">
        <FontAwesomeIcon icon={faSearch} size="sm" style={{ color: "white" }} />
      </button>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="p-1 border-[1px] rounded-r-2xl border-black/40 bg-gray-200 dark:border-white/40 focus:outline-none text-sm dark:bg-[#2b2a2a]"
      />
    </form>
  );
};

export default SearchForm;
