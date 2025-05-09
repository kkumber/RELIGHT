import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../common/Loading";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"; // Import the PDF.js worker
import sanitizeString from "../../utils/sanitizeString";
import dataURLtoFile from "../../utils/dataURLtoFile";
import Uploading from "../common/Uploading";

// Configure PDF.js to use the worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface Prop {
  isDemo: boolean;
}

const AddBookForm: React.FC<Prop> = ({ isDemo }) => {
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    sypnosis: "",
  });

  // States for file uploads (PDF file and book cover)
  const [pdf_File, setPdf_File] = useState<File | undefined>(undefined);
  const [book_Cover, setBook_Cover] = useState<File | undefined>(undefined);
  // For previewing the extracted cover image.
  const [coverPreview, setCoverPreview] = useState<string>("");
  // Extraction loading states
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const { data, isLoading, error, postData } = useFetch();

  const imageRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const cleanedValue = sanitizeString(value);
    if (value !== cleanedValue) {
      alert("Invalid characters detected. Only ':', ',', '.', '-' are allowed");
    }

    setBookForm((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        alert("Incorrect File type");
        pdfRef.current!.value = "";
        return;
      }
      if (file.size > 10485760) {
        alert("File size too big. Maximum of 10MB");
        pdfRef.current!.value = "";
        return;
      }
      // Set the title directly from the PDF file name (without extension)
      const titleFromFile = file.name.replace(/\.[^/.]+$/, "");
      const cleanedValue = sanitizeString(titleFromFile);
      setBookForm((prev) => ({ ...prev, title: cleanedValue }));
      setPdf_File(file);
    }
  };

  const handleBookCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files;
    if (imageFile?.length) {
      const file = imageFile[0];
      if (!file.type.startsWith("image/")) {
        alert("Incorrect Image Format");
        if (imageRef.current) {
          imageRef.current.value = "";
        }
        return;
      }
      setBook_Cover(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (let [key, value] of Object.entries(bookForm)) {
      formData.append(key, value.trim());
    }
    if (pdf_File) formData.append("pdf_file", pdf_File);
    if (book_Cover) formData.append("book_cover", book_Cover);

    await postData("library/books/", formData);
    if (error) {
      alert("Error: " + error);
    } else {
      alert("PDF Uploaded");
      setBookForm({ title: "", author: "", sypnosis: "" });
      setPdf_File(undefined);
      setBook_Cover(undefined);
      setCoverPreview("");

      if (pdfRef.current) pdfRef.current.value = "";
      if (imageRef.current) imageRef.current.value = "";
    }
    pdfRef.current!.value = "";
  };

  // Extract details (author and book cover) from the PDF when a file is selected.
  useEffect(() => {
    if (!pdf_File) return;

    const extractDetails = async () => {
      setIsExtracting(true);
      try {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const arrayBuffer = this.result;
          if (arrayBuffer instanceof ArrayBuffer) {
            const typedArray = new Uint8Array(arrayBuffer);
            const loadingTask = pdfjs.getDocument(typedArray);
            const pdfDocument = await loadingTask.promise;

            // --- Extract built-in metadata for author (if available) ---
            let metaAuthor = "";
            try {
              const metaDataResult = await pdfDocument.getMetadata();
              const info = metaDataResult.info;
              if (info) {
                metaAuthor = info.Author ? info.Author.trim() : "";
              }
            } catch (metaErr) {
              console.error("Metadata extraction error:", metaErr);
            }

            // --- Extract text from the first 3 pages for fallback author ---
            let extractedText = "";
            const pagesToScan = Math.min(3, pdfDocument.numPages);
            for (let i = 1; i <= pagesToScan; i++) {
              const page = await pdfDocument.getPage(i);
              const textContent = await page.getTextContent();
              extractedText +=
                textContent.items.map((item: any) => item.str).join("\n") +
                "\n";
            }
            const lines = extractedText
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);

            // --- Author Extraction ---
            let extractedAuthor = metaAuthor;
            if (!extractedAuthor) {
              // First, look for lines starting with "Author:" or "By:"
              const authorRegex = /^(?:Author|By):\s*(.+)$/i;
              for (const line of lines) {
                const match = line.match(authorRegex);
                if (match) {
                  extractedAuthor = match[1].trim();
                  break;
                }
              }
            }
            // If still not found, look for a line that is all uppercase
            if (!extractedAuthor) {
              for (const line of lines) {
                if (
                  line === line.toUpperCase() &&
                  !/volume/i.test(line) &&
                  !/copyright/i.test(line) &&
                  line.length > 2
                ) {
                  extractedAuthor = line;
                  break;
                }
              }
            }

            // --- Book Cover Extraction from page 1 ---
            const page1 = await pdfDocument.getPage(1);
            const viewport = page1.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page1.render({ canvasContext: context!, viewport }).promise;
            const coverDataUrl = canvas.toDataURL("image/png");
            setCoverPreview(coverDataUrl);
            if (!book_Cover) {
              const coverFile = dataURLtoFile(coverDataUrl, "cover.png");
              setBook_Cover(coverFile);
            }

            // Update the form state with the extracted author.
            setBookForm((prev) => ({
              ...prev,
              author: extractedAuthor || prev.author,
            }));
          }
          setIsExtracting(false);
        };
        fileReader.readAsArrayBuffer(pdf_File);
      } catch (err) {
        console.error("Error during extraction:", err);
        setIsExtracting(false);
      }
    };

    extractDetails();
  }, [pdf_File]);

  return (
    <div className="w-full">
      <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-md mb-4 text-pretty max-w-screen-sm m-auto flex flex-wrap">
        <p className="font-semibold">Note:</p>
        <p>
          This form automatically extracts details from the selected PDF (e.g.,
          author and cover image). The title is set using the file name while
          the sypnosis must be entered manually. Please verify the extracted
          details and update them manually if they are incorrect or incomplete.
        </p>
      </div>
      {/* Loading indicator placed outside the form container */}
      {isExtracting && (
        <div className="flex items-center justify-center p-4">
          <Loading />
          <span className="ml-2 text-gray-700 animate-pulse">
            Extracting details...
          </span>
        </div>
      )}

      {isLoading && (
        <p className="animate-pulse text-center mb-4 text-gray-700">
          Please Wait. Upload may take a while
        </p>
      )}

      <form onSubmit={handleSubmit} className="">
        <div className="bg-primaryRed p-4 rounded-t-xl">
          <p className="text-xl font-semibold">Submit a Book</p>
        </div>

        <div className="border-2 border-black/10 dark:border-white/10 p-4 rounded-b-xl flex flex-col gap-y-8 shadow-lg">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={bookForm.title}
              required
              placeholder="Title"
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed text-black dark:border-white/10 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] dark:text-white/80"
            />
          </div>

          {/* Author */}
          <div className="flex flex-col">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              onChange={handleChange}
              value={bookForm.author}
              required
              placeholder="Author"
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed text-black dark:border-white/10 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] dark:text-white/80"
            />
          </div>

          {/* Sypnosis */}
          <div className="flex flex-col">
            <label htmlFor="sypnosis">Sypnosis</label>
            <textarea
              name="sypnosis"
              onChange={handleChange}
              value={bookForm.sypnosis}
              required
              placeholder="Enter a brief synopsis..."
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed text-black dark:border-white/10 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] dark:text-white/80"
            />
          </div>

          {/* PDF File */}
          <div className="flex flex-col">
            <label htmlFor="pdf_file">Upload PDF</label>
            <input
              type="file"
              name="pdf_file"
              accept="application/pdf"
              ref={pdfRef}
              required
              onChange={handlePDFChange}
            />
          </div>

          {/* Book Cover */}
          <div className="flex flex-col">
            <label htmlFor="book_cover">Upload Book Cover</label>
            <input
              type="file"
              name="book_cover"
              accept="image/*"
              ref={imageRef}
              onChange={handleBookCoverChange}
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Extracted Cover"
                className="mt-2 max-h-48 object-contain"
              />
            )}
          </div>

          <button
            className="bg-primaryRed hover:bg-primaryRed/80 rounded-md p-2 text-white font-medium transition-all disabled:cursor-not-allowed"
            disabled={isLoading || isDemo}
          >
            {isLoading ? <Uploading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
