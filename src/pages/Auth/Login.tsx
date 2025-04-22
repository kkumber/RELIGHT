import AuthForm from "../../components/Forms/AuthForm";

const Login = () => {
  return (
    // <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-transparent">
    //   {/* Main Content */}
    //   <div className="flex justify-center items-center max-w-screen-sm m-auto">
    //     <AuthForm action="Login" />
    //   </div>
    // </div>
    <div className="min-h-screen flex flex-col m-auto">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <AuthForm action="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
