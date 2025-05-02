import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordConfirm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [confirmPass, setConfirmPass] = useState<string>("");
  const { data, isLoading, error, postData } = useFetch();
  const { token } = useParams();
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData("api/password_reset/confirm/", {
      token: token,
      password: passwordRef.current?.value,
    });
    alert("Password Changed Successfully");
    navigate("/login");
  };

  useEffect(() => {
    // Validate token first, if not go back to pass request
    postData("api/password_reset/validate_token/", { token: token });
  }, []);

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPass(value);
  };
  return (
    <div className="min-h-screen flex flex-col m-auto bg-gray-100">
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
            {/* User Inputs */}
            <div className="flex flex-col justify-center gap-y-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="password"
                  required={true}
                  ref={passwordRef}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  required={true}
                  value={confirmPass}
                  onChange={handleConfirmPassword}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>

              <button
                type="submit"
                className="bg-primaryRed text-white py-2 px-4 rounded-md max-w-min hover:bg-primaryRed/80"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
