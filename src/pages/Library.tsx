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
    <main className="px-2 sm:px-4">
      <h3 className="text-3xl font-bold mb-4">Library</h3>

      {error && <ErrorMsg error={error} />}

      {isLoading ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
          {Array.from({ length: 20 }).map((_, i) => (
            <SkeletonBookListAnimation key={i} />
          ))}
        </div>
      ) : bookList && bookList.length > 0 ? (
        <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
          {bookList.map((book) => (
            <RenderBooks book={book} size="h-60 w-full" key={book.id} />
          ))}
        </section>
      ) : (
        <span>Nothing here yet...</span>
      )}
    </main>
  );
};

export default Library;
