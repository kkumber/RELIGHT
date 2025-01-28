import { useParams } from "react-router-dom";
import SearchForm from "../../components/Forms/SearchForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RenderBooks from "../../components/Renders/RenderBooks";
import { FetchData } from "../Home";
import { Book } from "../../components/Renders/RenderBooks";

const Search = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [searchResult, setSearchResult] = useState<Book[]>();

  useEffect(() => {
    fetchData(`library/books/search/?search_query=${query}`);
    console.log(query);
  }, [query]);

  useEffect(() => {
    if (data?.results) {
      setSearchResult(data.results);
    }
  }, [data]);

  return (
    <section className="flex flex-wrap gap-4 w-11/12 m-auto">
      {searchResult &&
        searchResult.map((book) => (
          <div className="" key={book.id}>
            <RenderBooks book={book} />
          </div>
        ))}
    </section>
  );
};

export default Search;
