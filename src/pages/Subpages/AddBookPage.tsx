import { useEffect, useState } from "react";
import AddBookForm from "../../components/Forms/AddBookForm";
import Footer from "../../components/layout/Footer";
import { useUserContext } from "../Auth/AuthProvider";
import AlertModal from "../../components/common/AlertModal";

const AddBookPage = () => {
  const { user } = useUserContext();
  const [isDemo, setIsDemo] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.username === "DemoUser") {
      setIsDemo(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col mt-4">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {user && isDemo && (
            <AlertModal
              title="Demo Account"
              message="You’re signed in as a demo user. You can try uploading a light novel for an extraction demo, but uploads are disabled for demo accounts. Register an official account if you want to upload a light novel."
            />
          )}
          <AddBookForm isDemo={isDemo} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddBookPage;
