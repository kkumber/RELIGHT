import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RenderBooks from "../../components/Renders/RenderBooks";
import useFetch from "../../hooks/useFetch";
import { FetchData } from "../Home";
import { useEffect, useState } from "react";
import ErrorMsg from "../../components/common/ErrorMsg";
import SkeletonBookListAnimation from "../../components/common/SkeletonBookListAnimation";

const Browse = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const [bookList, setBookList] = useState<FetchData>();
  const [query, setQuery] = useState<string>("views");
  const [pageSize, setPageSize] = useState<number>(20);

  useEffect(() => {
    fetchData(`library/books/?sort_by=${query}&page_size=${pageSize}`);
  }, []);

  useEffect(() => {
    fetchData(`library/books/?sort_by=${query}&page_size=${pageSize}`);
  }, [query]);

  useEffect(() => {
    if (data) {
      setBookList(data);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#121212]">
      <Header />
      {/* Main Container */}
      <div className="flex flex-grow flex-col w-full mx-auto mb-20 bg-white rounded-lg dark:bg-[#1E1E1E] shadow-lg max-w-screen-lg">
        <nav className="p-4">
          {/* Wrapper div enables horizontal scrolling on mobile */}
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="flex gap-4 md:gap-8 items-center font-bold whitespace-nowrap">
              <li>
                <button
                  onClick={() => setQuery("views")}
                  className={`${
                    query === "views" ? "bg-primaryRed" : undefined
                  } py-1 px-4 rounded-full transition-all duration-300 linear hover:text-black/40 dark:hover:text-white/40`}
                >
                  Popular
                </button>
              </li>
              <li>
                <button
                  onClick={() => setQuery("?")}
                  className={`${
                    query === "?" ? "bg-primaryRed" : undefined
                  } py-1 px-4 rounded-full transition-all duration-300 linear hover:text-black/40 dark:hover:text-white/40`}
                >
                  Explore
                </button>
              </li>
              <li>
                <button
                  onClick={() => setQuery("upload_date")}
                  className={`${
                    query === "upload_date" ? "bg-primaryRed" : undefined
                  } py-1 px-4 rounded-full transition-all duration-300 linear hover:text-black/40 dark:hover:text-white/40`}
                >
                  What's New
                </button>
              </li>
              <li>
                <button
                  onClick={() => setQuery("title")}
                  className={`${
                    query === "title" ? "bg-primaryRed" : undefined
                  } py-1 px-4 rounded-full transition-all duration-300 linear hover:text-black/40 dark:hover:text-white/40`}
                >
                  A-Z List
                </button>
              </li>
            </ul>
          </div>
          <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />
        </nav>
        <div className="flex justify-center items-center">
          {error && <ErrorMsg error={error} />}
        </div>
        <section className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 px-4 pb-4">
          {isLoading
            ? Array.from({ length: 10 }, (_, i) => (
                <SkeletonBookListAnimation key={i} />
              ))
            : bookList?.results.map((book) => (
                <div key={book.id}>
                  <RenderBooks book={book} size="h-48 w-32" />
                </div>
              ))}
        </section>
      </div>

      {/* Next/Previous */}
      <div className="flex justify-between items-center w-9/12 m-auto max-w-screen-lg">
        <button
          onClick={() => fetchData(data.next)}
          disabled={!bookList?.previous}
          className="bg-transparent py-2 px-4 rounded-full text-primaryRed font-semibold hover:text-primaryRed/50"
        >
          Previous
        </button>
        <button
          onClick={() => fetchData(data.previous)}
          disabled={!bookList?.next}
          className="bg-transparent py-2 px-4 rounded-full text-primaryRed font-semibold hover:text-primaryRed/50"
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
