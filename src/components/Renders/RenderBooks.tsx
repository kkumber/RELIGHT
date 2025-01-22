import { Link } from "react-router-dom";


export interface Book {
    id: number,
    title: string,
    author: string,
    sypnosis: string,
    upload_date: string,
    uploaded_by: string,
    book_cover: string,
    pdf_file: File
    slug: string,
}

interface BookData {
  book: Book
}

const RenderBooks = ({book}: BookData) => {

  return (
        <article className="flex flex-col border-2">
          {/* Images */}
          <div className="h-60 w-40">
            <img src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`} alt={book.title} className="w-full h-full object-contain" />
          </div>
          {/* Title */}
          <div className="">
            <Link to={`/details/${book.slug}`}>
            <b>{book.title}</b>
            </Link>
          </div>
          {/* WatchList */}
          <div className="">

          </div>

          {/* Author */}
          <div className="">
            <p>Written by: {book.author} </p>
          </div>

        </article>
  );
};

export default RenderBooks