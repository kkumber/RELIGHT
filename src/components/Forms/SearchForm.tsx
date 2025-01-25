import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchForm = () => {

    const handleSubmit = () => {

    };
  return (
    <form onSubmit={handleSubmit} className="flex">
        <button className="bg-black py-[3px] px-2 rounded-l-md border-primaryRed">
            <FontAwesomeIcon icon={faSearch} size="sm" style={{color: 'white'}}/>
        </button>
        <input type="search" name="search" placeholder="Search..." className="p-1 border-[1px] rounded-r-2xl border-black focus:outline-none text-sm"/>
    </form>
  );
};

export default SearchForm