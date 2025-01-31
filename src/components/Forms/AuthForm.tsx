import { useEffect, useState, useContext } from "react";
import Loading from "../common/Loading";
import ErrorMsg from "../common/ErrorMsg";
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../../hooks/useAuthFetch";
import { Link } from "react-router-dom";

interface Prop {
  action: string;
}

const AuthForm = ({ action }: Prop) => {
  const { data, isLoading, error, getToken, registerUser } = useAuthFetch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const name = action === "Login" ? "Login" : null;

  const handleChangeLoginData = (e: any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleChangeRegisterData = (e: any) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (loginData.username !== "" && loginData.password !== "") {
      await getToken(loginData);
      navigate("/");
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    await registerUser(registerData);
    navigate("/login");
  };

  return (
    <>
      {name ? (
        <form onSubmit={handleLogin} className="mx-auto md:w-1/4">
          <h1 className="text-4xl">
            <b>Welcome Back</b>
          </h1>
          <span className="text-gray-500">Please enter your details</span>
          {/* User Inputs */}
          <div className="flex flex-col justify-center gap-y-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="username">Username </label>
              <input
                type="text"
                name="username"
                required={true}
                value={loginData.username}
                onChange={handleChangeLoginData}
                className="rounded-sm border-2 border-gray-300 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                name="password"
                required={true}
                value={loginData.password}
                onChange={handleChangeLoginData}
                className="rounded-sm border-2 border-gray-300 p-2"
              />
            </div>
            <Link to={"*"} className="text-end underline text-blue-500">
              Forgot password
            </Link>
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md"
            >
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
      ) : (
        <form onSubmit={handleRegister} className="mx-auto md:w-1/4">
          <h1 className="text-4xl">
            <b>Ready to be part of the archive?</b>
          </h1>
          <span className="text-gray-500">Please enter your details</span>
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
                className="rounded-sm border-2 border-gray-300 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChangeRegisterData}
                className="rounded-sm border-2 border-gray-300 p-2"
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
                className="rounded-sm border-2 border-gray-300 p-2"
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
                className="rounded-sm border-2 border-gray-300 p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md"
            >
              {isLoading ? <Loading /> : "Register"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AuthForm;
