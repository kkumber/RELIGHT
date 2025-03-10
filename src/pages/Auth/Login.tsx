import AuthForm from "../../components/Forms/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-transparent">
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <AuthForm action="Login" />
      </div>
    </div>
  );
};

export default Login;
