import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../hooks/useAuthFetch";
import Loading from "../../components/common/Loading";

const Register = () => {
  const { data, isLoading, error, registerUser } = useAuthFetch();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChangeRegisterData = (e: any) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value.trim(),
    });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    await registerUser(registerData);
  };

  useEffect(() => {
    if (data && data.success) {
      alert("Registered Successfully");
      navigate("/login");
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col m-auto">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <form
            onSubmit={handleRegister}
            className="w-full bg-white p-8 rounded-md shadow-md dark:bg-[#1e1e1e]"
          >
            <h1 className="text-4xl">
              <b>Ready to be part of the archive?</b>
            </h1>
            <span className="text-black/60 dark:text-white/60">
              Please enter your details
            </span>
            {error && <p className="text-red-400 italic">{error}</p>}
            {/* User inputs */}
            <div className="flex flex-col justify-center gap-y-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="username">Username </label>
                <input
                  type="text"
                  name="username"
                  required={true}
                  value={registerData.username}
                  onChange={handleChangeRegisterData}
                  className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  required={true}
                  value={registerData.email}
                  onChange={handleChangeRegisterData}
                  className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password1">Password </label>
                <input
                  type="password"
                  name="password1"
                  required={true}
                  value={registerData.password1}
                  onChange={handleChangeRegisterData}
                  className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password2 ">Confirm Password </label>
                <input
                  type="password"
                  name="password2"
                  required={true}
                  value={registerData.password2}
                  onChange={handleChangeRegisterData}
                  className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>
              <button
                type="submit"
                className="bg-primaryRed text-white py-2 px-4 rounded-md max-w-min hover:bg-primaryRed/80"
              >
                {isLoading ? <Loading /> : "Register"}
              </button>
              <span className="text-center">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="underline underline-offset-auto text-blue-500">
                    Sign in
                  </span>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
