import AuthForm from "../../components/Forms/AuthForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col m-auto">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <AuthForm action="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
