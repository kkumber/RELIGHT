import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../common/Loading";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"; // Import the PDF.js worker

// Configure PDF.js to use the worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// Helper to convert a data URL to a File object.
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const AddBookForm = () => {
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    sypnosis: "", // user fills manually
  });

  // States for file uploads (PDF file and book cover)
  const [pdf_File, setPdf_File] = useState<File | undefined>(undefined);
  const [book_Cover, setBook_Cover] = useState<File | undefined>(undefined);
  // For previewing the extracted cover image.
  const [coverPreview, setCoverPreview] = useState<string>("");
  // Extraction loading state
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const { isLoading, error, postData } = useFetch();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 10485760) {
        alert("File size too big. Maximum of 10MB");
        return;
      }
      // Set the title directly from the PDF file name (without extension)
      const titleFromFile = file.name.replace(/\.[^/.]+$/, "");
      setBookForm((prev) => ({ ...prev, title: titleFromFile }));
      setPdf_File(file);
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
    if (pdf_File) formData.append("pdf_file", pdf_File);
    if (book_Cover) formData.append("book_cover", book_Cover);

    await postData("library/books/", formData);
    if (error) {
      alert("Error: " + error);
    } else {
      alert("PDF Uploaded");
    }
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

            console.log("Extracted PDF lines:", lines);

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
    <div className="flex justify-center items-center flex-col">
      <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-md mb-4 text-pretty w-11/12 m-auto flex flex-wrap">
        <p className="font-semibold">Note:</p>
        <p>
          This form automatically extracts details from the selected PDF (e.g.,
          author and cover image). The title is set using the file name. Please
          verify the extracted details and update them manually if they are
          incorrect or incomplete.
        </p>
      </div>
      {/* Loading indicator placed outside the form container */}
      {isExtracting && (
        <div className="flex items-center justify-center p-4">
          <Loading />
          <span className="ml-2 text-gray-700">Extracting details...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-11/12 m-auto">
        <div className="bg-primaryRed p-4 rounded-t-xl">
          <p className="text-xl font-semibold">Submit a Book</p>
        </div>

        <div className="border-2 border-black/10 dark:border-white/10 p-4 rounded-b-xl flex flex-col gap-y-8 shadow-md">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={bookForm.title}
              placeholder="Title"
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed text-black"
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
              placeholder="Author"
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed text-black"
            />
          </div>

          {/* Sypnosis */}
          <div className="flex flex-col">
            <label htmlFor="sypnosis">Sypnosis</label>
            <textarea
              name="sypnosis"
              onChange={handleChange}
              value={bookForm.sypnosis}
              placeholder="Enter a brief synopsis..."
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-primaryRed text-black"
            />
          </div>

          {/* PDF File */}
          <div className="flex flex-col">
            <label htmlFor="pdf_file">Upload PDF</label>
            <input
              type="file"
              name="pdf_file"
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

          <button className="bg-primaryRed hover:-translate-y-1 rounded-md p-2 text-white font-medium transition-all">
            {isLoading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
