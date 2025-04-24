import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export interface Book {
  id: number;
  title: string;
  author: string;
  sypnosis: string;
  upload_date: string;
  uploaded_by: string;
  book_cover: string;
  pdf_file: string;
  slug: string;
  views: number;
  likes: [];
  average_rating: number;
}

export interface BookData {
  book: Book;
  size: string;
}

const RenderBooks = ({ book, size }: BookData) => {
  const { postData } = useFetch();

  return (
    <>
      {/* Images */}
      <Link
        to={`/details/${book.slug}`}
        onClick={() =>
          postData(`library/books/details/${book.slug}/views/`, {})
        }
        className="flex flex-col gap-1"
      >
        <div className={`${size}`}>
          <img
            src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
            alt={book.title}
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-all duration-300 ease-out"
          />
        </div>
        {/* Title */}
        <div className="flex">
          <p className="font-medium overflow-hidden text-ellipsis w-36 line-clamp-2">
            {book.title}
          </p>
        </div>
      </Link>
    </>
  );
};

export default RenderBooks;
