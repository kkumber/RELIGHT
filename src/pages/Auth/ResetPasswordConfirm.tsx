import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import useAuthValidation from "../../hooks/useAuthValidation";
import { FiLock, FiCheckCircle } from "react-icons/fi";

const ResetPasswordConfirm = () => {
  const [passwords, setPasswords] = useState({ password1: "", password2: "" });
  const { data, isLoading, error, postData } = useFetch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { isValid, password1ErrorMsg, password2ErrorMsg, validate } =
    useAuthValidation({ InputName: passwords });

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      await postData("api/password_reset/confirm/", {
        token: token,
        password: passwords.password1,
      });
      alert("Password Changed Successfully");
      navigate("/login");
    }
  };

  useEffect(() => {
    postData("api/password_reset/validate_token/", { token: token });
  }, []);

  const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value.trim(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col m-auto bg-gray-100 dark:bg-[#121212]">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handlePasswordReset}
            className="w-full bg-white p-8 rounded-md shadow-md dark:bg-[#1e1e1e]"
          >
            <h1 className="text-4xl">
              <b>Change Password</b>
            </h1>
            <span className="text-black/60 dark:text-white/60">
              Please enter your new password
            </span>
            {error && <p className="text-red-400">{error}</p>}

            {/* User Inputs */}
            <div className="flex flex-col justify-center gap-y-4 mt-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="password1" className="flex items-center gap-2">
                  <FiLock className="text-xl" />
                  New Password
                </label>
                {password1ErrorMsg && (
                  <p className="text-red-400 italic">{password1ErrorMsg}</p>
                )}
                <input
                  type="password"
                  name="password1"
                  id="password1"
                  required
                  value={passwords.password1}
                  onChange={handlePasswordOnChange}
                  onKeyDown={validate}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
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
                  value={passwords.password2}
                  onChange={handlePasswordOnChange}
                  onKeyDown={validate}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-primaryRed text-white py-2 px-4 rounded-md max-w-min hover:bg-primaryRed/80"
              >
                {isLoading ? (
                  "Changing..."
                ) : (
                  <>
                    <FiCheckCircle className="text-lg" />
                    Confirm
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
