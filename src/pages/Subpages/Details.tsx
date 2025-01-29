import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CommentForm from "../../components/Forms/CommentForm";
import RenderComments from "../../components/Renders/RenderComments";
import Loading from "../../components/common/Loading";
import ErrorMsg from "../../components/common/ErrorMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useUserContext } from "../../utils/AuthProvider";
import { Book } from "../../components/Renders/RenderBooks";

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
    updateData,
  } = useFetch();
  const {
    data: bookComments,
    isLoading: commentsLoading,
    error: commentsError,
    fetchData: fetchBookComments,
  } = useFetch();
  const { slug } = useParams();
  const [book, setBook] = useState<Book>();
  const [userComments, setUserComments] = useState<BookComments[]>([]);
  const [content, setContent] = useState<string>();
  const { user } = useUserContext();
  const bookURL = `library/books/details/${slug}/`;
  const commentURL = `library/books/details/${slug}/comments/`;

  const getBookDetails = async () => {
    if (slug) {
      await fetchBookDetails(bookURL);
      await fetchBookComments(commentURL);
    }
  };

  const handleBookmark = () => {
    updateData(`library/books/details/${slug}/`, {});
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      await postData(commentURL, { content: content });
    } else {
      alert("Comment is empty");
    }
    // Call function again to render
    await fetchBookComments(commentURL);
  };

  useEffect(() => {
    if (slug) {
      getBookDetails();
    }
    console.log(user);
  }, []);

  useEffect(() => {
    if (bookDetails) {
      setBook(bookDetails);
      console.log(bookDetails);
    }
  }, [bookDetails]);

  useEffect(() => {
    if (bookComments) {
      setUserComments(bookComments);
    }
  }, [bookComments]);

  return (
    <div className="flex flex-col bg-gray-100">
      <section>
        {book && (
          <article key={book.id}>
            <div className="relative w-full">
              {/* Background Blur Image */}
              <div className="z-0 h-full bg-center bg-no-repeat">
                <img
                  src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
                  alt={book.title}
                  className="w-full h-[50vh] object-cover blur-lg"
                />
              </div>
              {/* Details */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center gap-4 items-center z-10 text-white w-11/12 m-auto">
                {/* Book Cover */}
                <div className="w-40 h-60 md:w-48 md:h-72">
                  <img
                    src={`https://res.cloudinary.com/dkhgtdh3i/${book.book_cover}`}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-md "
                  />
                </div>
                {/* Book Information */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold">{book.title}</h3>
                  <p>Author: {book.author}</p>
                  {/* Views and Likes */}
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <p>Views</p>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ color: "#ffffff" }}
                          size="lg"
                        />
                        <p>{book.views}</p>
                      </div>
                    </div>
                    <span className="border-[1px] border-white"></span>
                    <div className="flex flex-col">
                      <p>Bookmarked</p>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          style={{ color: "#ffffff" }}
                          size="lg"
                        />
                        <p>{book.likes.length - 1}</p>
                      </div>
                    </div>
                  </div>
                  <p>Upload Date: {book.upload_date} </p>
                  <p>Uploaded by: {book.uploaded_by} </p>
                  <button
                    className="bg-primaryRed py-2 px-4 rounded-lg text-white font-semibold"
                    onClick={() => handleBookmark()}
                  >
                    Add to Library
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* Bottom Container */}
      <div className="w-11/12 md:w-8/12 m-auto bg-white px-8 py-4 rounded-lg">
        {/* Sypnosis Section */}
        {bookLoading && <Loading />}
        {bookError && <ErrorMsg error={bookError} />}
        {book && (
          <section className="my-10">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold">Sypnosis</h2>
                <hr className="bg-black w-full p-[.2px]" />
              </div>
              <div>
                <p>{book.sypnosis}</p>
              </div>
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-2xl font-bold">Comments</h2>
              <hr className="bg-black w-full p-[.2px]" />
            </div>
            <div className="bg-gray-300 p-4">
              <p className="text-primaryRed">
                Please read and apply the rules before posting a comment.
              </p>
              <p>By sharing your comment, you agree to all relevant terms.</p>
            </div>
          </div>

          <div className="my-10 flex flex-col gap-4">
            <h3 className="font-bold text-2xl">Leave a Review</h3>
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
    </div>
  );
};

export default Details;
