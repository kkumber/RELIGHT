import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>();

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleChangePassword}
      className="w-full bg-white p-8 rounded-md shadow-md dark:bg-[#1e1e1e] max-w-screen-lg m-auto"
    >
      <h1 className="text-4xl">
        <b>Change Password</b>
      </h1>
      <span className="text-black/60 dark:text-white/60">
        Please enter the details you used during account creation
      </span>
      {/* User Inputs */}
      <div className="flex flex-col justify-center gap-y-4 mt-4">
        <div className="flex flex-col">
          <label htmlFor="email">Enter your Email </label>
          <input
            type="email"
            name="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border-[1px] border-black/10 dark:border-white/10 p-2 dark:bg-[#2c2c2c] dark:hover:bg-[#373737] focus:bg-[$424242]"
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
  );
};

export default ResetPassword;
