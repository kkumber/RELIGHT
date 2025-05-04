import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import useAuthFetch from "../../hooks/useAuthFetch";
import Loading from "../../components/common/Loading";
import useAuthValidation from "../../hooks/useAuthValidation";

const Register = () => {
  const { data, isLoading, error, registerUser } = useAuthFetch();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const {
    isValid,
    validate,
    usernameErrorMsg,
    emailErrorMsg,
    password1ErrorMsg,
    password2ErrorMsg,
  } = useAuthValidation({
    InputName: registerData,
    password: registerData.password1,
  });

  const handleChangeRegisterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value.trim(),
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      await registerUser(registerData);
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (data && data.success) {
      alert("Registered Successfully");
      navigate("/login");
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col m-auto bg-gray-100 dark:bg-[#121212]">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <form
            onSubmit={handleRegister}
            className="w-full bg-white p-8 rounded-md shadow-md dark:bg-[#1e1e1e]"
          >
            <h1 className="text-4xl mb-2">
              <b>Ready to be part of the archive?</b>
            </h1>
            <span className="text-black/60 dark:text-white/60 mb-4">
              Please enter your details
            </span>
            {error && <p className="text-red-400 italic mb-4">{error}</p>}

            {/* User inputs */}
            <div className="flex flex-col justify-center gap-y-4 mt-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="flex items-center gap-2">
                  <FiUser className="text-xl" />
                  Username
                </label>
                {usernameErrorMsg && (
                  <p className="text-red-400 italic">{usernameErrorMsg}</p>
                )}
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={registerData.username}
                  maxLength={15}
                  onChange={handleChangeRegisterData}
                  onKeyUp={validate}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="flex items-center gap-2">
                  <FiMail className="text-xl" />
                  Email
                </label>
                {emailErrorMsg && (
                  <p className="text-red-400 italic">{emailErrorMsg}</p>
                )}
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={registerData.email}
                  onChange={handleChangeRegisterData}
                  onKeyUp={validate}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password1" className="flex items-center gap-2">
                  <FiLock className="text-xl" />
                  Password
                </label>
                {password1ErrorMsg && (
                  <p className="text-red-400 italic">{password1ErrorMsg}</p>
                )}
                <input
                  type="password"
                  name="password1"
                  id="password1"
                  required
                  value={registerData.password1}
                  onChange={handleChangeRegisterData}
                  onKeyUp={validate}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password2" className="flex items-center gap-2">
                  <FiLock className="text-xl" />
                  Confirm Password
                </label>
                {password2ErrorMsg && (
                  <p className="text-red-400 italic">{password2ErrorMsg}</p>
                )}
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  required
                  value={registerData.password2}
                  onChange={handleChangeRegisterData}
                  onKeyUp={validate}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primaryRed text-white py-2 px-4 rounded-md max-w-min hover:bg-primaryRed/80 transition"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <FiUserPlus className="text-lg" />
                    Register
                  </>
                )}
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
