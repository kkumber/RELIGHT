import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import RenderBooks from "../components/Renders/RenderBooks";
import { Book } from "../components/Renders/RenderBooks";
import Loading from "../components/common/Loading";
import ErrorMsg from "../components/common/ErrorMsg";
import RenderBooksSideInfo from "../components/Renders/RenderBooksSideInfo";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export interface FetchData {
  count: number;
  next: undefined;
  previous: undefined;
  results: Book[];
}

const Home = () => {
  const { data: returns, isLoading, error, fetchData } = useFetch();
  const [bookList, setBookList] = useState<FetchData>();
  const [query, setQuery] = useState<string>("title");

  useEffect(() => {
    fetchData(`library/books/?sort_by=${query}`);
  }, []);

  useEffect(() => {
    if (returns) {
      setBookList(returns);
      console.log(returns);
    }
  }, [returns]);

  return (
    <>
      <Header />

      {/* Main Home Container  */}
      <div className="flex flex-wrap md:grid md:grid-cols-5 md:gap-x-20 mx-auto w-11/12 my-auto min-h-screen gap-y-20">
        {isLoading && <Loading />}
        {error && <ErrorMsg error={error} />}
        {/* Popular Uploads */}
        <div className="md:col-span-3">
          <b className="text-lg">Popular Uploads</b>
          <hr className="bg-primaryRed p-[2px] mb-4 rounded-full" />
          <section className="flex flex-wrap gap-4">
            {bookList?.results.map((book) => (
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
            {isLoading && <Loading />}
            {error && <ErrorMsg error={error} />}
            {bookList?.results.map((book) => (
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
