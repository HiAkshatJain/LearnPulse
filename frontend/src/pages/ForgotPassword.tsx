import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch(); //@ts-ignore
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault(); //@ts-ignore
    dispatch(getPasswordResetToken(email));

    console.log(email);
  };

  return (
    <div className="flex justify-center items-center lg:mt-20 sm:mt-14">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Reset your password
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Have no fear. We'll email you instructions to reset your
                password. If you dont have access to your email we can try
                account recovery{" "}
                <a
                  href="login"
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                >
                  Login here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleOnSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
