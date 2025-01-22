import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CommentForm from "../../components/Forms/CommentForm";
import RenderComments from "../../components/Renders/RenderComments";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";

export interface Book {
    id: number,
    title: string,
    author: string,
    sypnosis: string,
    upload_date: string,
    uploaded_by: string,
    book_cover: string,
    pdf_file: File
}


interface BookComments {
  owner: string,
  content: string,
  post_date: string
}


const RenderBooks = () => {
  const {data: bookDetails, isLoading: bookLoading, error: bookError, fetchData: fetchBookDetails, postData} = useFetch();
  const {data: bookComments, isLoading: commentsLoading, error: commentsError, fetchData: fetchBookComments} = useFetch();
  const {slug} = useParams();
  const [book, setBook] = useState<Book>();
  const [userComments, setUserComments] = useState<BookComments[]>([]);
  const [content, setContent] = useState<string>();
  const bookURL = `library/books/details/${slug}/`;
  const commentURL = `library/books/details/${slug}/comments/`;
  
  const getBookDetails = async () => {
    if (slug) {
      await fetchBookDetails(bookURL);
      await fetchBookComments(commentURL);
      if (bookDetails) {
        setBook(bookDetails)
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content) {
      await postData(commentURL, {'content': content});
    } else {
      alert('Comment is empty')
    }
    // Call function again to render
    getBookDetails();
};


  useEffect(() => {
    if (slug) {
      getBookDetails();
    }
  }, [])

  useEffect(() => {
    if (bookDetails) {
      setBook(bookDetails);
    }
  }, [bookDetails])

  useEffect(() => {
    if (bookComments) {
      setUserComments(bookComments);
    }
  }, [bookComments])




  return (
    <>
    <section>
    {bookLoading && <Loading />}
    {bookError && <ErrorMsg error={bookError} />}
    {book && <article key={book.id}>
            <h3>{book.title}</h3>
            <img src={book.book_cover} alt={book.title} />
            <p>Sypnosis: {book.sypnosis} </p>
            <p>Written by: {book.author} </p>
            <p>Upload Date: {book.upload_date} </p>
            <p>Uploaded by: {book.uploaded_by} </p>
        </article>}
    </section>

    <section>
      <h3>Add Comment</h3>
      <CommentForm setContent={setContent} handleCommentSubmit={handleCommentSubmit} />
    </section>

    <section>
      <header>
        <h2>Comments</h2>
        {commentsLoading && <Loading />}
        {commentsError && <ErrorMsg error={commentsError} />}
        { userComments &&
          userComments.map(userComment => 
            <div>
              <RenderComments userComment={userComment} />
            </div>
          )
        }
      </header>
    </section>
    </>

  );
};

export default RenderBooks