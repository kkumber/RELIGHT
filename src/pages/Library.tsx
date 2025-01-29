import { useEffect, useState } from "react";
import RenderBooks from "../components/Renders/RenderBooks";
import Footer from "../components/layout/Footer";
import useFetch from "../hooks/useFetch";
import { Book } from "../components/Renders/RenderBooks";

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
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-wrap w-11/12 m-auto flex-grow gap-4">
        {bookList &&
          bookList.map((book) => (
            <div className="" key={book.id}>
              <RenderBooks book={book} />
            </div>
          ))}
      </main>
      <Footer />
    </div>
  );
};

export default Library;
