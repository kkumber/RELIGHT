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
      <main className="flex flex-wrap w-11/12 m-auto flex-grow gap-x-4 my-12">
        {bookList ? (
          <section className="gap-4 flex flex-wrap">
            {bookList.map((book) => (
              <div key={book.id} className="">
                <RenderBooks book={book} />
              </div>
            ))}
          </section>
        ) : (
          <span>Nothing here yet...</span>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Library;
