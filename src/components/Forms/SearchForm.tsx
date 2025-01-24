import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchForm = () => {

    const handleSubmit = () => {

    };
  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
        <button className="bg-primaryRed p-2 rounded-l-2xl border-primaryRed border-2">
            <FontAwesomeIcon icon={faSearch} />
        </button>
        <input type="search" name="search" placeholder="Search..." className="p-2 border-2 rounded-r-2xl border-black focus:outline-none"/>
    </form>
  );
};

export default SearchForm