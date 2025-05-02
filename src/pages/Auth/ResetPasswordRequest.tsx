import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";

const ResetPasswordRequest = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { postData } = useFetch();

  const handleChangePasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current) {
      await postData("api/password_reset/", { email: emailRef.current.value });
    }
  };

  return (
    <div className="min-h-screen flex flex-col m-auto bg-gray-100">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleChangePasswordRequest}
            className="w-full bg-white p-8 rounded-md shadow-md dark:bg-[#1e1e1e]"
          >
            <h1 className="text-4xl">
              <b>Password Reset Request</b>
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Please enter the details you used during account creation.
            </p>
            <p className="text-black/60 dark:text-white/60">
              A password reset link will be sent to your email.
            </p>
            {/* User Inputs */}
            <div className="flex flex-col justify-center gap-y-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="email">Enter your Email </label>
                <input
                  type="email"
                  name="email"
                  required={true}
                  ref={emailRef}
                  className="rounded-md border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
                />
              </div>

              <button
                type="submit"
                className="bg-primaryRed text-white py-2 px-4 rounded-md max-w-min hover:bg-primaryRed/80"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
