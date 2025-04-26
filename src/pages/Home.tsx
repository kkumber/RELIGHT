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

      <div className="flex flex-col justify-center items-center my-4 mx-2 sm:mx-4">
        {error && <ErrorMsg error={error} />}

        <div className="rounded-md border-[1px] border-gray-500 p-4 bg-gray-100 dark:bg-[#1e1e1e] w-full max-w-screen-lg mb-12">
          <article className="">
            <h2 className="font-bold text-xl">Welcome to Relight</h2>
            <p className="dark:text-white text-black">
              Dive into your favorite worlds—store your personal PDF library of
              light novels, bookmark every chapter, and share your discoveries
              with fellow readers. Whether you’re chasing the next epic
              adventure or reliving classic tales, Relight makes it effortless
              to organize, read, and connect. Upload your PDFs, build your
              collection, and join a community where every story finds its home.
            </p>
          </article>
        </div>

        <div className="flex flex-wrap md:grid md:grid-cols-5 md:gap-x-20 gap-y-20 max-w-screen-lg m-auto">
          {/* Popular Uploads */}
          <div className="max-md:w-full md:col-span-3 max-md:grid">
            <b className="text-lg">Popular Uploads</b>
            <div className="h-[2px] bg-primaryRed/80 w-full my-4 rounded-full" />

            <section className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
              {isLoading
                ? Array.from({ length: viewsPageSize }, (_, i) => (
                    <SkeletonBookListAnimation key={i} />
                  ))
                : popularList?.results.map((book, index) => (
                    <RenderBooks book={book} size="h-48 w-full" key={index} />
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
                      <RenderBooksSideInfo book={book} size="h-48 w-full" />
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
