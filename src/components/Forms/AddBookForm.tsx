import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../common/Loading";
import ErrorMsg from "../common/ErrorMsg";

const AddBookForm = () => {
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    sypnosis: "",
  });

  // This 2 values are for file submits (pdf files and images)
  const [pdf_File, setPdf_File] = useState<File>();
  const [book_Cover, setBook_Cover] = useState<File>();
  const { data, isLoading, error, fetchData, postData } = useFetch();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setBookForm({
      ...bookForm,
      [name]: value,
    });
  };

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdf_File(e.target.files[0]);
      if (e.target.files[0].size > 10485760) {
        alert("File size too big. Maximum of 10MB");
      }
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

    for (let [key, value] of Object.entries(bookForm)) {
      formData.append(key, value);
    }
    formData.append("pdf_file", pdf_File!);
    formData.append("book_cover", book_Cover || "");

    await postData("library/books/", formData);
    if (error) {
      alert("Error: " + error);
    } else {
      alert("PDF Uploaded");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-primaryRed p-4 rounded-t-xl ">
        <p className="text-xl font-semibold">Submit a Book</p>
      </div>

      <div className="border-2 border-black/10 dark:border-white/10 p-4 rounded-b-xl flex flex-col gap-y-8 shadow-md">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title">Title </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={bookForm.title}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
          />
        </div>
        {/* Author */}
        <div className="flex flex-col">
          <label htmlFor="author">Author </label>
          <input
            type="text"
            name="author"
            onChange={handleChange}
            value={bookForm.author}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
          />
        </div>
        {/* Sypnosis */}
        <div className="flex flex-col">
          <label htmlFor="sypnosis">Sypnosis </label>
          <textarea
            name="sypnosis"
            onChange={handleChange}
            value={bookForm.sypnosis}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
          />
        </div>
        {/* PDF File */}
        <div className="flex flex-col">
          <label htmlFor="pdf_file">Upload PDF </label>
          <input
            type="file"
            name="pdf_file"
            required={true}
            onChange={handlePDFChange}
          />
        </div>
        {/* Book Cover */}
        <div className="flex flex-col">
          <label htmlFor="book_cover">Upload Book Cover </label>
          <input
            type="file"
            name="book_cover"
            onChange={handleBookCoverChange}
          />
        </div>
        <button className="bg-primaryRed hover:-translate-y-1 rounded-md p-2 text-white font-medium transition-all duration-300 ease-out hover:shadow-md">
          {isLoading ? <Loading /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
