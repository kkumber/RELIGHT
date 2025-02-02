import AuthForm from "../../components/Forms/AuthForm";
import Footer from "../../components/layout/Footer";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-transparent">
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <AuthForm action="Register" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
