import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sanitizeString from "../../utils/sanitizeString";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const cleanedValue = sanitizeString(value);
    if (value !== cleanedValue) {
      alert(
        "Please use only letters, numbers, spaces, and the following characters: ':', ',', '.', '-'."
      );
    }
    setQuery(cleanedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/?query=${query.trim()}&page_size=10`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-500 dark:text-gray-400"
          />
        </div>

        {/* Search Input */}
        <input
          type="search"
          name="search"
          placeholder="Search..."
          onChange={searchInput}
          value={query}
          className="w-full pl-10 pr-4 py-1 border border-gray-500 rounded-2xl bg-gray-200 dark:bg-[#2b2a2a] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default SearchForm;
