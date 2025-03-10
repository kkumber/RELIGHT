import { useEffect, useState } from "react";
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
  const { data, isLoading, error } = useConcurrentFetch([
    `library/books/?sort_by=views&page_size=10`,
    `library/books/?sort_by=upload_date&page_size=5`,
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
      <div className="w-11/12 flex justify-center items-center m-4">
        {isLoading && <Loading />}
        {error ? (
          <ErrorMsg error={error} />
        ) : (
          // Main Home Container
          <div className="flex flex-wrap md:grid md:grid-cols-5 md:gap-x-20 m-auto w-11/12 min-h-screen gap-y-20 lg:w-8/12">
            {/* Popular Uploads */}
            <div className="md:col-span-3">
              <b className="text-lg">Popular Uploads</b>
              <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />
              <section className="flex flex-wrap gap-4 items-center justify-center sm:justify-normal">
                {popularList?.results.map((book) => (
                  <div key={book.id}>
                    <RenderBooks book={book} />
                  </div>
                ))}
              </section>
            </div>

            {/* New & Trending */}
            <div className="col-span-2">
              <b className="text-lg">New & Trending</b>
              <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />
              <section className="flex flex-col gap-8">
                {newList?.results.map((book) => (
                  <div key={book.id}>
                    <RenderBooksSideInfo book={book} />
                    <div className="bg-black/10 dark:bg-white/10 p-[0.5px]" />
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
