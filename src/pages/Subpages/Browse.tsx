import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RenderBooks from "../../components/Renders/RenderBooks";
import useFetch from "../../hooks/useFetch";
import { FetchData } from "../Home";
import { useEffect, useState } from "react";

const Browse = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const [bookList, setBookList] = useState<FetchData>();
  const [query, setQuery] = useState<string>("likes");

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
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Main Container */}
      <div className="flex flex-grow flex-col w-9/12 mx-auto mb-20">
        <nav>
          <ul className="flex gap-8 items-center font-bold">
            <li>
              <button onClick={() => setQuery("likes")}>Popular</button>
            </li>
            <li>
              <button onClick={() => setQuery("views")}>Explore</button>
            </li>
            <li>
              <button onClick={() => setQuery("upload_date")}>
                What's New
              </button>
            </li>
            <li>
              <button onClick={() => setQuery("title")}>A-Z List</button>
            </li>
          </ul>
          <hr className="bg-primaryRed p-[2px] mb-4 rounded-full my-3" />
        </nav>
        <section className="flex flex-wrap gap-12">
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
