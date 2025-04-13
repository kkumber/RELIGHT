import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import RenderBooks from "../../components/Renders/RenderBooks";
import { Book } from "../../components/Renders/RenderBooks";
import Footer from "../../components/layout/Footer";
import Loading from "../../components/common/Loading";
import ErrorMsg from "../../components/common/ErrorMsg";
import SkeletonBookListAnimation from "../../components/common/SkeletonBookListAnimation";
import NotFound from "../NotFound";

const Search = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [searchResult, setSearchResult] = useState<Book[]>();
  const [pageSize, setPageSize] = useState<number>(10);

  const renderSearchResult = () => {
    if (isLoading) {
      return Array.from({ length: pageSize }, (_, i) => (
        <SkeletonBookListAnimation key={i} />
      ));
    } else if (error) {
      return <ErrorMsg error={error} />;
    } else if (!searchResult?.length) {
      return <span>No books found</span>;
    } else {
      return searchResult.map((book) => (
        <div className="" key={book.id}>
          <RenderBooks book={book} size="h-48 w-32" />
        </div>
      ));
    }
  };

  useEffect(() => {
    fetchData(
      `library/books/search/?search_query=${query}&page_size=${pageSize}`
    );
  }, [query]);

  useEffect(() => {
    if (data?.results) {
      setSearchResult(data.results);
    }
    renderSearchResult();
  }, [data]);

  return (
    <>
      <section className="w-11/12 m-auto min-h-screen flex flex-col gap-4 my-4">
        <h2 className="text-xl font-bold py-1 px-4 bg-primaryRed rounded-md w-40 text-white">
          Search
        </h2>
        <div className="flex flex-wrap gap-4 flex-grow justify-center md:justify-normal">
          <>{renderSearchResult()}</>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Search;
