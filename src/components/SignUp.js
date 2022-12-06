import React from "react";
import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center bg-violet-50 text-white dark:bg-black-900">
      <div className="mb-20 flex w-1/3 flex-col items-center rounded-3xl bg-violet-600 p-10 shadow-lg shadow-slate-500 dark:bg-black-700 dark:shadow-black">
        <h1 className="mb-10 w-full border-b-2 pb-2 text-center text-2xl font-bold dark:border-black-500">
          Sign Up
        </h1>
        <form
          method="post"
          action="http://localhost:4001/todo/v1/u/signUp"
          className="flex w-full flex-col items-start"
        >
          <label htmlFor="fullName" className="ml-2 mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            className="mb-8 w-full rounded-2xl bg-white p-2 px-4 text-black dark:bg-black-500 dark:text-white"
          />

          <label htmlFor="email" className="ml-2 mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="mb-8 w-full rounded-2xl bg-white p-2 px-4 text-black dark:bg-black-500 dark:text-white"
          />

          <label htmlFor="password" className="ml-2 mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="mb-8 w-full rounded-2xl bg-white p-2 px-4 text-black dark:bg-black-500 dark:text-white"
          />

          <NavLink to="/signIn" className="mx-auto">
            <button
              type="submit"
              className=" rounded-3xl bg-white px-4 py-3 font-semibold text-violet-600 transition-all duration-200 ease-in-out hover:scale-110 active:scale-50 dark:bg-violet-600 dark:text-white"
            >
              Create account
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
