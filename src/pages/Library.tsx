import { useEffect, useState } from "react";
import RenderBooks from "../components/Renders/RenderBooks";
import useFetch from "../hooks/useFetch";
import { Book } from "../components/Renders/RenderBooks";
import ErrorMsg from "../components/common/ErrorMsg";
import Loading from "../components/common/Loading";

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
    <div className="">
      {error && <ErrorMsg error={error} />}
      {isLoading && <Loading />}
      <main className="w-11/12 m-auto gap-x-4 my-12">
        {bookList ? (
          <section className="gap-2 md:gap-4 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap">
            {bookList.map((book) => (
              <RenderBooks book={book} size="h-60 w-36" key={book.id} />
            ))}
          </section>
        ) : (
          <span>Nothing here yet...</span>
        )}
      </main>
    </div>
  );
};

export default Library;
