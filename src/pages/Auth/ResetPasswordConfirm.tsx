import { useRef, useState } from "react";

const ResetPasswordConfirm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [confirmPass, setConfirmPass] = useState<string>("");

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPass(value);
  };
  return (
    <div className="min-h-screen flex flex-col m-auto">
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
              Please enter the new password
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
                  className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
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
                  className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
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
