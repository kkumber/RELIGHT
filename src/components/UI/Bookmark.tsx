import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

interface BookmarkInterface {
  book: number;
  id: number;
  user: number;
  page: number[];
}

interface BookmarkProps {
  slug: string | undefined;
  pageNum: number;
  currentPage: number;
  navMode: string;
  scrollToPage: (page: number) => void;
  setPageNum: (num: number) => void;
}

const Bookmark: React.FC<BookmarkProps> = ({
  slug,
  pageNum,
  currentPage,
  navMode,
  scrollToPage,
  setPageNum,
}) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const { data, fetchData, postData, deleteData } = useFetch();

  // Fetch bookmarks from backend
  useEffect(() => {
    fetchData(`library/books/create/bookmark/page/${slug}`);
  }, []);

  // Update bookmarks state when data changes
  useEffect(() => {
    if (Array.isArray(data)) {
      setBookmarks(data.map((bookmark: BookmarkInterface) => bookmark.page[0]));
    }
  }, [data]);

  // Toggle bookmark for a page
  const toggleBookmark = async (page: number) => {
    if (Array.isArray(data)) {
      const existingBookmark = data.find(
        (bookmark: BookmarkInterface) => bookmark.page[0] === page
      );

      if (existingBookmark) {
        await deleteData(
          `library/books/delete/bookmark/page/${existingBookmark.id}`
        );
      } else {
        await postData(`library/books/create/bookmark/page/${slug}`, { page });
      }
    }
    await fetchData(`library/books/create/bookmark/page/${slug}`);
  };

  return (
    <div className="">
      {/* Bookmark Toggle Button */}
      <button
        onClick={() =>
          navMode === "infinite"
            ? toggleBookmark(currentPage)
            : toggleBookmark(pageNum)
        }
        className="py-1 px-2 md:px-4 md:py-2 bg-gray-800 text-white rounded-md flex items-center gap-2"
      >
        <FontAwesomeIcon
          icon={
            navMode === "infinite"
              ? bookmarks.includes(currentPage)
                ? solidBookmark
                : regularBookmark
              : bookmarks.includes(pageNum)
              ? solidBookmark
              : regularBookmark
          }
          size="sm"
        />
        <span className="text-sm">
          {navMode === "infinite" ? currentPage : pageNum}
        </span>
      </button>

      {/* Bookmarks List */}
      {bookmarks.length > 0 && (
        <div className="flex flex-col gap-2 justify-center mt-4">
          {bookmarks
            .sort((a, b) => a - b)
            .map((bm) => (
              <button
                key={bm}
                onClick={() =>
                  navMode === "infinite" ? scrollToPage(bm) : setPageNum(bm)
                }
                className="p-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-md flex items-center gap-1"
              >
                <FontAwesomeIcon icon={solidBookmark} size="sm" />
                <span className="text-sm">{bm}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
