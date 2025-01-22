import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const AddBookForm = () => {
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    sypnosis: '',
  });

  // This 2 values are for file submits (pdf files and images)
  const [pdf_File, setPdf_File] = useState<File>();
  const [book_Cover, setBook_Cover] = useState<File>();
  const {data, isLoading, error, fetchData, postData} = useFetch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setBookForm({
      ...bookForm,
      [name]: value
    });
  }

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdf_File(e.target.files[0]);
    }
  };

  const handleBookCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBook_Cover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    for (let [key, value] of Object.entries(bookForm)){
      formData.append(key, value);
    }
    formData.append('pdf_file', pdf_File!);
    formData.append('book_cover', book_Cover || '')

    await postData('library/books/', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label> <br />
      <input type="text" name="title" onChange={handleChange} value={bookForm.title} /> <br />
      <label htmlFor="author">Author: </label> <br />
      <input type="text" name="author" onChange={handleChange} value={bookForm.author} /> <br />
      <label htmlFor="sypnosis">Sypnosis: </label>
      <input type="text" name="sypnosis" onChange={handleChange} value={bookForm.sypnosis} /> <br />
      <label htmlFor="pdf_file">Upload PDF: </label>
      <input type="file" name="pdf_file" required={true} onChange={handlePDFChange} /> <br />
      <label htmlFor="book_cover">Upload Book Cover: </label>
      <input type="file" name="book_cover" onChange={handleBookCoverChange} /> 
      <br /><button>Submit</button>
    </form>
  );
};

export default AddBookForm;