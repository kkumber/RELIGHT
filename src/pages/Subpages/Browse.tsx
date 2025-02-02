import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RenderBooks from "../../components/Renders/RenderBooks";
import useFetch from "../../hooks/useFetch";
import { FetchData } from "../Home";
import { useEffect, useState } from "react";

const Browse = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const [bookList, setBookList] = useState<FetchData>();
  const [query, setQuery] = useState<string>("views");

  useEffect(() => {
    fetchData(`library/books/?sort_by=${query}`);
  }, []);

  useEffect(() => {
    fetchData(`library/books/?sort_by=${query}`);
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
      <div className="flex flex-grow flex-col w-9/12 mx-auto mb-20 bg-white p-8 rounded-lg dark:bg-[#1E1E1E]">
        <nav>
          <ul className="flex gap-8 items-center font-bold">
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
          <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />
        </nav>
        <section className="flex flex-wrap gap-4">
          {bookList?.results.map((book) => (
            <div key={book.id} className="h-full w-28 md:w-40">
              <RenderBooks book={book} />
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
