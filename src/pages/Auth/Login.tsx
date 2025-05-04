import { useEffect, useState } from "react";
import useAuthFetch from "../../hooks/useAuthFetch";
import { useNavigate } from "react-router-dom";
import { User } from "../../hooks/useAuthFetch";
import { UserAuth } from "../../hooks/useAuthFetch";
import { UserRegisterData } from "../../hooks/useAuthFetch";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

interface Auth {
  data: User | undefined;
  isLoading: boolean;
  error: string | null | undefined;
  getToken: (data: UserAuth) => void;
  registerUser: (data: UserRegisterData) => void;
}

const Login = () => {
  const { data, isLoading, error, getToken }: Auth = useAuthFetch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChangeLoginData = (e: any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value.trim(),
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (loginData.username !== "" && loginData.password !== "") {
      await getToken(loginData);
    }
  };
  useEffect(() => {
    if (data && data.success) {
      navigate("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert("Error: " + error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col m-auto bg-gray-100 dark:bg-[#121212]">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleLogin}
            className="w-full bg-white p-8 rounded-md shadow-md dark:bg-[#1e1e1e]"
          >
            <h1 className="text-4xl">
              <b>Welcome Back</b>
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Please enter your details
            </p>
            {data && !data.success && (
              <p className="text-red-400 italic">{data.message}</p>
            )}

            {/* User Inputs */}
            <div className="flex flex-col justify-center gap-y-4 mt-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="flex items-center gap-2">
                  <FiUser className="text-xl" /> <span>Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required={true}
                  value={loginData.username}
                  onChange={handleChangeLoginData}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="flex items-center gap-2">
                  <FiLock className="text-xl" /> <span>Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required={true}
                  value={loginData.password}
                  onChange={handleChangeLoginData}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>
              <Link
                to="/reset-request"
                className="text-end underline text-blue-500"
              >
                Forgot password
              </Link>
              <button
                type="submit"
                className="bg-primaryRed text-white py-2 px-4 rounded-md max-w-min hover:bg-primaryRed/80 flex items-center justify-center gap-2"
              >
                <FiLogIn className="text-xl" />
                {isLoading ? <Loading /> : "Login"}
              </button>
              <span className="text-center">
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="underline underline-offset-auto text-blue-500">
                    Sign Up
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

export default Login;
