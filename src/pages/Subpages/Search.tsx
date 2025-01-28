import { useParams } from "react-router-dom";
import SearchForm from "../../components/Forms/SearchForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RenderBooks from "../../components/Renders/RenderBooks";
import { FetchData } from "../Home";
import { Book } from "../../components/Renders/RenderBooks";
import Footer from "../../components/layout/Footer";

const Search = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [searchResult, setSearchResult] = useState<Book[]>();

  useEffect(() => {
    fetchData(`library/books/search/?search_query=${query}`);
  }, [query]);

  useEffect(() => {
    if (data?.results) {
      setSearchResult(data.results);
    }
  }, [data]);

  return (
    <>
      <section className="w-11/12 m-auto min-h-screen flex flex-col gap-4">
        <h2 className="text-xl font-bold py-1 px-4 bg-primaryRed rounded-md w-40 text-white">
          Search
        </h2>
        <div className="flex flex-wrap gap-4 flex-grow">
          {searchResult &&
            searchResult.map((book) => (
              <div className="" key={book.id}>
                <RenderBooks book={book} />
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Search;
