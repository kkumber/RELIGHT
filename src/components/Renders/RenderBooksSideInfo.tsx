import { BookData } from "./RenderBooks";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const RenderBooksSideInfo = ({ book }: BookData) => {
  const { postData } = useFetch();

  return (
    <div className="grid grid-cols-3 gap-x-4 justify-between mb-4 md:flex md:flex-col gap-2">
      {/* Image Container */}
      <div className="col-span-1 h-28 md:h-36 w-full">
        <Link
          to={`/details/${book.slug}`}
          onClick={() =>
            postData(`library/books/details/${book.slug}/views/`, {})
          }
        >
          <img
            src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
            alt={book.title}
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-all duration-300 ease-out"
          />
        </Link>
      </div>
      {/* Infomation Container */}
      <div className="flex flex-col col-span-2 justify-start">
        <div className="">
          <Link to={`/details/${book.slug}`}>
            <p className="font-semibold">{book.title}</p>
          </Link>
        </div>
        <div className="text-sm max-w-40">
          <p className="text-black/60 dark:text-white/60">
            Written by: {book.author}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenderBooksSideInfo;
