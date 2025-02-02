import { useParams } from "react-router-dom";
import PDFViewer from "../../components/Renders/PDFViewer";

const Reader = () => {
  const { pdf_file } = useParams();
  const pdfUrl = `https://res.cloudinary.com/dkhgtdh3i/${pdf_file}`;
  return <PDFViewer pdfUrl={pdfUrl} />;
};

export default Reader;
