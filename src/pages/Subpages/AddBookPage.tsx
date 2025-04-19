import AddBookForm from "../../components/Forms/AddBookForm";
import Footer from "../../components/layout/Footer";

const AddBookPage = () => {
  return (
    <div className="min-h-screen flex flex-col mt-4">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <AddBookForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddBookPage;
