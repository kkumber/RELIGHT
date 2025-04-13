import { useEffect, useState } from "react";
import RenderBooks from "../components/Renders/RenderBooks";
import { Book } from "../components/Renders/RenderBooks";
import ErrorMsg from "../components/common/ErrorMsg";
import RenderBooksSideInfo from "../components/Renders/RenderBooksSideInfo";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useConcurrentFetch from "../hooks/useConcurrentFetch";
import SkeletonBookListAnimation from "../components/common/SkeletonBookListAnimation";
import SkeletonNewBookAnimation from "../components/common/SkeletonNewBookAnimation";

export interface FetchData {
  count: number;
  next: undefined;
  previous: undefined;
  results: Book[];
}

const Home = () => {
  const [viewsPageSize, setViewsPageSize] = useState<number>(10);
  const [recentPageSize, setRecentPageSize] = useState<number>(5);
  const [popularList, setPopularList] = useState<FetchData>();
  const [newList, setNewList] = useState<FetchData>();

  const { data, isLoading, error } = useConcurrentFetch([
    `library/books/?sort_by=views&page_size=${viewsPageSize}`,
    `library/books/?sort_by=upload_date&page_size=${recentPageSize}`,
  ]);

  useEffect(() => {
    if (data) {
      setPopularList(data[0]);
      setNewList(data[1]);
    }
  }, [data]);

  return (
    <div className="">
      <Header />
      <div className="flex flex-col justify-center items-center m-4">
        {error && <ErrorMsg error={error} />}

        <div className="flex flex-wrap md:grid md:grid-cols-5 md:gap-x-20 m-auto min-h-screen gap-y-20 lg:w-10/12">
          {/* Popular Uploads */}
          <div className="md:col-span-3">
            <b className="text-lg">Popular Uploads</b>
            <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />

            <section className="flex flex-wrap gap-4 items-center justify-center sm:justify-normal">
              {isLoading
                ? Array.from({ length: viewsPageSize }, (_, i) => (
                    <SkeletonBookListAnimation key={i} />
                  ))
                : popularList?.results.map((book) => (
                    <div key={book.id}>
                      <RenderBooks
                        book={book}
                        size="h-48 w-32 md:h-52 md:w-36"
                      />
                    </div>
                  ))}
            </section>
          </div>

          {/* New & Trending */}
          <div className="col-span-2">
            <b className="text-lg">New & Trending</b>
            <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />
            <section className="flex flex-col gap-8">
              {isLoading
                ? Array.from({ length: recentPageSize }, (_, i) => (
                    <SkeletonNewBookAnimation key={i} />
                  ))
                : newList?.results.map((book) => (
                    <div key={book.id}>
                      <RenderBooksSideInfo book={book} size="h-48 w-32" />
                      <div className="bg-black/10 dark:bg-white/10 p-[0.5px]" />
                    </div>
                  ))}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
