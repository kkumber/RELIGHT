import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CommentForm from "../../components/Forms/CommentForm";
import RenderComments from "../../components/Renders/RenderComments";
import Loading from "../../components/common/Loading";
import ErrorMsg from "../../components/common/ErrorMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faBookmark,
  faCalendar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

import { LuBook } from "react-icons/lu";
import { FaBookOpen } from "react-icons/fa";
import { BsShare, BsShareFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { useUserContext } from "../Auth/AuthProvider";
import { Book } from "../../components/Renders/RenderBooks";
import Footer from "../../components/layout/Footer";

interface BookComments {
  owner: string;
  content: string;
  post_date: string;
}

const Details = () => {
  const {
    data: bookDetails,
    isLoading: bookLoading,
    error: bookError,
    fetchData: fetchBookDetails,
    postData,
  } = useFetch();

  const { data: bookComments, fetchData: fetchBookComments } = useFetch();
  const { slug } = useParams();
  const { user } = useUserContext();

  const [book, setBook] = useState<Book>();
  const [userComments, setUserComments] = useState<BookComments[]>([]);
  const [content, setContent] = useState<string>();
  const [hovered, setHovered] = useState<string | null>(null);

  const bookURL = `library/books/details/${slug}/`;
  const commentURL = `library/books/details/${slug}/comments/`;

  const navigate = useNavigate();

  const getBookDetails = async () => {
    if (slug) {
      fetchBookDetails(bookURL);
      fetchBookComments(commentURL);
    }
  };

  const handleBookmark = async () => {
    await postData(`library/books/details/${slug}/likes/`, {});
    fetchBookDetails(bookURL);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      await postData(commentURL, { content: content });
    } else {
      alert("Comment is empty");
    }
    fetchBookComments(commentURL);
  };

  const handleReadNavigate = (pdf_file: string) => {
    const encodedFileName = encodeURIComponent(pdf_file);
    navigate(`/read/${encodedFileName}/${slug}`);
  };

  const copyCurrentLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  useEffect(() => {
    if (slug) {
      getBookDetails();
    }
  }, []);

  useEffect(() => {
    if (bookDetails) {
      setBook(bookDetails);
    }
  }, [bookDetails]);

  useEffect(() => {
    if (bookComments) {
      setUserComments(bookComments);
    }
  }, [bookComments]);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-[#121212]">
      <section>
        {book && (
          <article key={book.id}>
            <div className="relative w-full">
              {/* Dark Overlay */}
              <div className="absolute inset-0 backdrop-blur-xs bg-gradient-to-b from-black/40 to-gray-100 dark:from-black/60 dark:to-[#121212] overflow-hidden"></div>
              {/* Background Blur Image */}
              <div className="z-0 bg-center bg-no-repeat">
                <img
                  src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
                  alt={book.title}
                  className="w-full h-[50vh] md:h-[70vh] object-cover"
                />
              </div>

              {/* Details Overlay */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center gap-1 p-2 md:gap-4 z-10 text-gray-900 dark:text-gray-100 w-full m-auto">
                {/* Book Information */}
                <div className="flex flex-col gap-12 text-center">
                  <div className="">
                    <h3 className="text-lg md:text-2xl font-semibold text-pretty">
                      {book.title}
                    </h3>
                    <p className="text-md md:text-lg">
                      <span className="font-semibold">{book.author}</span>
                    </p>
                  </div>

                  {/* Action Buttons Container */}
                  <div className="flex flex-row items-start gap-6 text-sm md:text-md justify-center">
                    <div>
                      <button
                        onClick={() => handleReadNavigate(book.pdf_file)}
                        className="flex flex-col gap-2 w-min"
                        onMouseEnter={() => setHovered("read")}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className="flex justify-center items-center">
                          {hovered === "read" ? (
                            <FaBookOpen size={25} />
                          ) : (
                            <LuBook size={25} />
                          )}
                        </div>
                        <div>
                          <p>Read</p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleBookmark()}
                        className="flex flex-col gap-2"
                        onMouseEnter={() => setHovered("heart")}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {book.likes && book.likes.includes(user?.id) ? (
                          <>
                            <div className="flex justify-center items-center">
                              {hovered === "heart" ? (
                                <div className="flex flex-col gap-2 justify-center items-center">
                                  <FaRegHeart size={25} />
                                  <p>Remove</p>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-2 justify-center items-center">
                                  <FaHeart size={25} />
                                  <p>In Library</p>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-center items-center">
                              {hovered ? (
                                <FaHeart size={25} />
                              ) : (
                                <FaRegHeart size={25} />
                              )}
                            </div>
                            <p>Add to Library</p>
                          </>
                        )}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => copyCurrentLink()}
                        className="flex flex-col gap-2"
                        onMouseEnter={() => setHovered("share")}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className="flex justify-center items-center">
                          {hovered === "share" ? (
                            <BsShareFill size={25} />
                          ) : (
                            <BsShare size={25} />
                          )}
                        </div>
                        <p>Share</p>
                      </button>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="flex justify-center gap-x-4 md:gap-x-8 text-xs md:text-sm mt-6 px-4">
                    {/* Views */}
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faEye} size="lg" />
                      <p className="font-semibold">{book.views}</p>
                    </div>

                    {/* Bookmarked */}
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faBookmark} size="lg" />
                      <p className="font-semibold">
                        {book.likes ? book.likes.length : 0}
                      </p>
                    </div>

                    {/* Upload Date */}
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendar} size="lg" />
                      <p className="font-semibold">{book.upload_date}</p>
                    </div>

                    {/* Uploaded By */}
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUser} size="lg" />
                      <p className="font-semibold">{book.uploaded_by}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* Bottom Container */}
      <div className="w-11/12 md:w-8/12 mx-auto mt-4 bg-white px-4 md:px-8 py-4 rounded-lg dark:bg-[#1E1E1E] shadow-md">
        {/* Sypnosis Section */}
        {book && (
          <section className="my-10">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold">Sypnosis</h2>
                <div className="bg-black/10 dark:bg-white/10 w-full p-[.8px] rounded-full" />
              </div>
              <div className="flex flex-wrap justify-between">
                <p>{book.sypnosis}</p>
                <div className="bg-center bg-no-repeat rounded-md">
                  <img
                    src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
                    alt={book.title}
                    className="w-full md:w-60 h-40 md:h-80 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-2xl font-bold">Comments</h2>
              <div className="bg-black/10 dark:bg-white/10 w-full p-[.8px] rounded-full" />
            </div>
            <div className="bg-gray-250 dark:bg-[#272727] p-4 rounded-sm">
              <p className="text-primaryRed">
                Please read and apply the rules before posting a comment.
              </p>
              <p>By sharing your comment, you agree to all relevant terms.</p>
            </div>
          </div>

          <div className="my-10 flex flex-col gap-4">
            <h3 className="font-bold text-2xl">Leave a Comment</h3>
            <CommentForm
              setContent={setContent}
              handleCommentSubmit={handleCommentSubmit}
            />
          </div>
        </section>

        {/* Render Comments */}
        <section>
          <div className="flex w-full flex-col gap-4">
            {userComments &&
              userComments.map((userComment, index) => (
                <div key={index}>
                  <RenderComments userComment={userComment} />
                </div>
              ))}
          </div>
        </section>
      </div>
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
};

export default Details;
