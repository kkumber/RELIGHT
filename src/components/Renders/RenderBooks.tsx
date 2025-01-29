import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons";
import useFetch from "../../hooks/useFetch";

export interface Book {
  id: number;
  title: string;
  author: string;
  sypnosis: string;
  upload_date: string;
  uploaded_by: string;
  book_cover: string;
  pdf_file: File;
  slug: string;
  views: number;
  likes: [];
}

export interface BookData {
  book: Book;
}

const RenderBooks = ({ book }: BookData) => {
  const { postData } = useFetch();

  return (
    <article className="flex flex-col ">
      {/* Images */}
      <Link
        to={`/details/${book.slug}`}
        onClick={() =>
          postData(`library/books/details/${book.slug}/views/`, {})
        }
      >
        <div className="h-48 w-32">
          <img
            src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
            alt={book.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        {/* Title */}
        <div className="">
          <p className="font-semibold">{book.title}</p>
        </div>
      </Link>
      {/* WatchList */}
      {/* <div className="flex gap-x-4">
            <div className="flex justify-between items-center gap-x-1">
              <FontAwesomeIcon icon={faHeart} style={{color: "#8f8f8f",}}/>
              <span className="text-gray-600">21k</span>
            </div>
            <div className="flex justify-between items-center gap-x-1">
              <FontAwesomeIcon icon={faBookmark} style={{color: "#8f8f8f",}}/>
              <span className="text-gray-600">21k</span>
            </div>
          </div> */}

      {/* Author */}
      {/* <div className="text-sm">
        <p className="text-gray-600">Written by: {book.author} </p>
      </div> */}
    </article>
  );
};

export default RenderBooks;
