import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchForm = () => {

    const handleSubmit = () => {

    };
  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
        <button className="bg-primaryRed p-1 rounded-l-md border-primaryRed border-[1px]">
            <FontAwesomeIcon icon={faSearch} size="lg"/>
        </button>
        <input type="search" name="search" placeholder="Search..." className="p-1 border-[1px] rounded-r-2xl border-black focus:outline-none"/>
    </form>
  );
};

export default SearchForm