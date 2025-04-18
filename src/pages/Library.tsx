import { useEffect, useState } from "react";
import RenderBooks from "../components/Renders/RenderBooks";
import useFetch from "../hooks/useFetch";
import { Book } from "../components/Renders/RenderBooks";
import ErrorMsg from "../components/common/ErrorMsg";
import SkeletonBookListAnimation from "../components/common/SkeletonBookListAnimation";

const Library = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const [bookList, setBookList] = useState<Book[]>();

  useEffect(() => {
    fetchData("library/books/bookmark/");
  }, []);

  useEffect(() => {
    if (data) {
      setBookList(data);
    }
  }, [data]);

  return (
    <main className="w-max-screen-lg mx-auto px-2 sm:px-4">
      <h3 className="text-3xl font-bold mb-4">Library</h3>
      {error && <ErrorMsg error={error} />}
      {bookList ? (
        <section className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(120px,140px))]">
          {isLoading ? (
            <SkeletonBookListAnimation />
          ) : (
            bookList.map((book) => (
              <RenderBooks book={book} size="h-60 w-36" key={book.id} />
            ))
          )}
        </section>
      ) : (
        <span>Nothing here yet...</span>
      )}
    </main>
  );
};

export default Library;
