import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import CommentForm from "../../../components/Forms/CommentForm";
import RenderComments from "../../../components/Renders/RenderComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faBookmark,
  faCalendar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { IoIosStar } from "react-icons/io";

import { useUserContext } from "../../Auth/AuthProvider";
import { Book } from "../../../components/Renders/RenderBooks";
import Footer from "../../../components/layout/Footer";
import Header from "./components/Header";
import ReadButton from "./components/ReadButton";
import AddToLibraryButton from "./components/AddToLibraryButton";
import CopyLinkButton from "./components/CopyLinkButton";
import Statistic from "./components/Statistic";
import { FaTrophy } from "react-icons/fa";

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
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const bookURL = `library/books/details/${slug}/`;
  const bookRatingURL = `library/books/details/${slug}/rating/`;
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
      await postData(bookRatingURL, { score: selectedRating });
    } else {
      alert("Comment is empty");
    }
    fetchBookComments(commentURL);
  };

  const handleStarRating = (index: number) => {
    setSelectedRating(index);
  };

  const handleReadNavigate = (pdf_file: string) => {
    const encodedFileName = encodeURIComponent(pdf_file);
    navigate(`/read/${encodedFileName}/${slug}`);
  };

  // For Dynamic Action Buttons
  const handleHover = (btn: string | null) => {
    setHovered(btn);
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
              <Header book_cover={book.book_cover} title={book.title} />

              {/* Details Overlay */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center gap-1 p-2 md:gap-4 z-10 text-gray-900 dark:text-gray-100 w-full m-auto">
                {/* Book Information */}
                <div className="flex flex-col gap-8 text-center">
                  <div className="">
                    <h3 className="text-3xl font-semibold text-pretty">
                      {book.title}
                    </h3>
                    <p className="text-md md:text-lg flex items-center justify-center gap-1">
                      <p>Author: </p>
                      <p>{book.author}</p>
                    </p>
                    {/* Ratings */}
                    <div className="flex items-center gap-1 justify-center">
                      <FaTrophy className="w-6 h-6 text-yellow-300" />
                      <p className="text-lg font-bold text-yellow-300">
                        Ratings:
                      </p>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IoIosStar
                          key={star}
                          className={`w-6 h-6 ${
                            Math.floor(book.average_rating) >= star
                              ? "text-yellow-500"
                              : "text-white"
                          }`}
                        />
                      ))}
                      <p className="text-lg font-semibold">
                        {book.average_rating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons Container */}
                  <div className="flex items-start gap-6 text-sm md:text-md justify-center">
                    <div>
                      <ReadButton
                        handleReadNavigate={handleReadNavigate}
                        handleHover={handleHover}
                        hovered={hovered}
                        pdf_file={book.pdf_file}
                      />
                    </div>
                    <div>
                      <AddToLibraryButton
                        handleBookmark={handleBookmark}
                        handleHover={handleHover}
                        likes={book.likes}
                        userId={user?.id}
                        hovered={hovered}
                      />
                    </div>
                    <div>
                      <CopyLinkButton
                        handleHover={handleHover}
                        hovered={hovered}
                      />
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="flex justify-center gap-x-4 md:gap-x-8 text-xs md:text-sm mt-6 px-4">
                    {/* Views */}
                    <Statistic icon={faEye} data={book.views} />

                    {/* Bookmarked */}
                    <Statistic
                      icon={faBookmark}
                      data={book.likes ? book.likes.length : 0}
                    />

                    {/* Upload Date */}
                    <Statistic icon={faCalendar} data={book.upload_date} />

                    {/* Uploaded By */}
                    <Statistic icon={faUser} data={book.uploaded_by} />
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

        {/* Review Section */}
        <section>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-2xl font-bold">Review</h2>
              <div className="bg-black/10 dark:bg-white/10 w-full p-[.8px] rounded-full" />
            </div>
            <div className="bg-gray-250 dark:bg-[#272727] p-4 rounded-sm">
              <p className="text-primaryRed">
                Please read and apply the rules before posting a review.
              </p>
              <p>By sharing your review, you agree to all relevant terms.</p>
            </div>
          </div>

          <div className="my-10 flex flex-col gap-4">
            <h3 className="font-bold text-2xl">Leave a Review</h3>
            <CommentForm
              setContent={setContent}
              handleCommentSubmit={handleCommentSubmit}
              handleStarRating={handleStarRating}
              selectedRating={selectedRating}
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
