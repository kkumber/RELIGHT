import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import RenderBooks from "../components/Renders/RenderBooks";
import { Book } from "../components/Renders/RenderBooks";
import Loading from "../components/common/Loading";
import ErrorMsg from "../components/common/ErrorMsg";
import RenderBooksSideInfo from "../components/Renders/RenderBooksSideInfo";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useConcurrentFetch from "../hooks/useConcurrentFetch";

export interface FetchData {
  count: number;
  next: undefined;
  previous: undefined;
  results: Book[];
}

const Home = () => {
  const [bookList, setBookList] = useState<FetchData>();
  const { data, isLoading, error } = useConcurrentFetch([
    `library/books/?sort_by=views`,
    `library/books/?sort_by=upload_date`,
  ]);
  const [popularList, setPopularList] = useState<FetchData>();
  const [newList, setNewList] = useState<FetchData>();

  useEffect(() => {
    if (data) {
      setPopularList(data[0]);
      setNewList(data[1]);
    }
  }, [data]);

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      {error && <ErrorMsg error={error} />}

      {/* Main Home Container  */}
      <div className="flex flex-wrap md:grid md:grid-cols-5 md:gap-x-20 mx-auto w-11/12 my-auto min-h-screen gap-y-20">
        {/* Popular Uploads */}
        <div className="md:col-span-3">
          <b className="text-lg">Popular Uploads</b>
          <hr className="bg-primaryRed p-[2px] mb-4 rounded-full" />
          <section className="flex flex-wrap gap-4">
            {popularList?.results.map((book) => (
              <div key={book.id} className="">
                <RenderBooks book={book} />
              </div>
            ))}
          </section>
        </div>

        {/* New Uploads */}
        <div className="col-span-2">
          <b className="text-lg">New & Trending</b>
          <hr className="bg-primaryRed p-[2px] mb-4 rounded-full" />
          <section className="flex flex-col gap-8">
            {newList?.results.map((book) => (
              <div key={book.id} className="">
                <RenderBooksSideInfo book={book} />
                <hr />
              </div>
            ))}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
