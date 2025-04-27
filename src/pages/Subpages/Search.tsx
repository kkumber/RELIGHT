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
        <RenderBooks book={book} size="h-64 w-full max-w-40" key={book.id} />
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
    <div className="min-h-screen flex flex-col">
      <section className="mx-4 flex flex-col flex-grow gap-4 mt-4">
        <h1 className="text-3xl font-bold dark:text-white/80">Search</h1>

        <div className="rounded-md border-[1px] border-gray-500 p-4 bg-gray-100 dark:bg-[#1e1e1e] w-full mb-12">
          <article className="">
            <h2 className="font-bold text-xl">
              Dive into the World of Light Novels
            </h2>
            <p className="dark:text-white text-black">
              Explore a vast collection of captivating stories—from heartwarming
              romances to thrilling adventures. Discover your next favorite
              light novel today!
            </p>
          </article>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
          <>{renderSearchResult()}</>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Search;
