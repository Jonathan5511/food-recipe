import React, { useRef } from "react";
import foodImage from "../../assets/Food.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const UserSignin = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSigninHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const pass = passwordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqvEsXLQZLJwrlkBae_1qmWjufBRaimeI",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: pass,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.login(data.idToken));
        dispatch(authActions.userMailId(data.email));
        history.push("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div
      className=" h-screen w-full overflow-hidden bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${foodImage})` }}
    >
      <div className="bg-gradient-to-l from-transparent via-transparent to-black/70"></div>

      <h1 className="text-center text-3xl w-[50%] sm:text-4xl md:text-5xl font-bold text-white bg-slate-800 bg-opacity-50 p-4 rounded-lg shadow-lg z-20">
        Welcome to Reciipie
      </h1>

      <section className="flex items-center justify-center p-6 md:p-12 z-10">
        <div className="w-suto max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-6 md:p-8 space-y-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h1>
          <form onSubmit={onSigninHandler} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                ref={emailInputRef}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                ref={passwordInputRef}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white rounded-lg py-2.5 text-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Have an account?{" "}
              <NavLink
                to="/login"
                className="text-primary-600 hover:underline dark:text-primary-500"
              >
                Log in
              </NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UserSignin;
