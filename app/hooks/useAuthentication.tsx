import { Button } from "@mui/material";
import { useState } from "react";

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    (typeof window !== 'undefined') ? localStorage.getItem("isLoggedInBySRP") === "true" : false
  );
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const handleLogin = (username: string, password: string) => {
    const storedPassword = process.env.NEXT_PUBLIC_REACT_APP_PASSWORD;

    if (password === storedPassword) {
      localStorage.setItem("isLoggedInBySRP", "true");
      setIsLoggedIn(true);
      setIsWrongPassword(false);
      location.reload();
    } else {
      setIsWrongPassword(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleWrongPasswordAlertClose = () => {
    setIsWrongPassword(false);
  };

  return {
    isLoggedIn,
    handleLogin,
    handleLogout,
    isWrongPassword,
    handleWrongPasswordAlertClose,
  };
};

export default useAuthentication;

export const LoginPage = () => {
  const {
    isLoggedIn,
    handleLogin,
    isWrongPassword,
    handleWrongPasswordAlertClose,
  } = useAuthentication();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin("", password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mx-20 mt-36 text-slate-800 font-extrabold">
        (SRP) Route Protection
      </div>
      <div className="mx-20 my-10 text-slate-800 text-center font-extrabold max-w-sm">
        This route is not intended for access, please validate credentials. If
        you are the developer of this "Digital Resume" proceed with your 64-bit
        static route protection(SRP) Key as an authenticator.
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 text-slate-700"
          placeholder="Password"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
        >
          Log In
        </Button>
      </form>
      {isWrongPassword && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <span className="block sm:inline">
            Wrong password. Please try again.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={handleWrongPasswordAlertClose}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.93 2.93a1 1 0 01-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 111.414-1.414l2.93 2.93 2.93-2.93a1 1 0 111.414 1.414l-2.93 2.93 2.93 2.93a1 1 0 010 1.414z"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};
