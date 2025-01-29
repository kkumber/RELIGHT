import AuthForm from "../../components/Forms/AuthForm";
import Footer from "../../components/layout/Footer";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <AuthForm action="Login" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
