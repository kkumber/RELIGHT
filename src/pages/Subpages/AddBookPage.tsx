import AddBookForm from "../../components/Forms/AddBookForm";
import Footer from "../../components/layout/Footer";

const AddBookPage = () => {
    return ( 
        <div className="min-h-screen flex flex-col gap-y-20">        
        <section className="justify-center items-center flex flex-grow m-auto w-1/2">
            <AddBookForm />
        </section>
        <Footer />
        </div>
     );
}
 
export default AddBookPage;