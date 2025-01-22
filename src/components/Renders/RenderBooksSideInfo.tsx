import { BookData } from "./RenderBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons";

const RenderBooksSideInfo = ({book}: BookData) => {
  return (
    <article className="grid grid-cols-3 gap-x-4 justify-between">
        {/* Image Container */}
        <div className="col-span-1 w-32">
            <img src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`} alt={book.title} className="w-full h-full object-contain" />
        </div>
        {/* Infomation Container */}
        <div className="flex flex-col col-span-2">
            <div className="">
                <b>{book.title}</b>
            </div>
            <div className="flex">
                <div className="flex justify-between items-center gap-x-1">
                    <FontAwesomeIcon icon={faHeart} style={{color: "#8f8f8f",}}/>
                    <span className="text-gray-600">21k</span>
                </div>
                <div className="flex justify-between items-center gap-x-1">
                    <FontAwesomeIcon icon={faBookmark} style={{color: "#8f8f8f",}}/>
                    <span className="text-gray-600">21k</span>
                </div>
            </div>
            <div className="text-xs">
                <p className="border-[1px] p-1 text-primaryRed border-primaryRed">Written by: {book.author} </p>
            </div>
        </div>
    </article>
  );
};

export default RenderBooksSideInfo;