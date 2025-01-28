import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const { data, fetchData } = useFetch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(`library/books/search/?search_query=${query}`);
    navigate("/search");
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <form onSubmit={handleSubmit} className="flex">
      <button className="bg-black py-[3px] px-2 rounded-l-md border-primaryRed">
        <FontAwesomeIcon icon={faSearch} size="sm" style={{ color: "white" }} />
      </button>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        className="p-1 border-[1px] rounded-r-2xl border-black focus:outline-none text-sm"
      />
    </form>
  );
};

export default SearchForm;
