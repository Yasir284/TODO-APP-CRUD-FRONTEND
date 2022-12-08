import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!(name && email && password)) {
      return toast("All fields are mandatory", { type: "error" });
    }

    const data = {
      name,
      email,
      password,
    };

    const creatUser = await axios
      .post("/todo/u/signUp", data)
      .catch((error) => {
        return error.response;
      });
    console.log(creatUser);

    if (!creatUser.data.success) {
      return toast(creatUser.data.message, { type: "error" });
    }

    toast(creatUser.data.message, { type: "success" });

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    navigate("/signIn");
  };

  return (
    <div className="flex w-full items-center justify-center bg-violet-50 text-white dark:bg-black-900">
      <div className="mt-12 flex w-1/3 flex-col items-center rounded-3xl bg-violet-600 p-10 shadow-lg shadow-slate-500 dark:bg-black-700 dark:shadow-black">
        <h1 className="mb-10 w-full border-b-2 pb-2 text-center text-2xl font-bold dark:border-black-500">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start"
        >
          <label htmlFor="fullName" className="ml-2 mb-2">
            Full Name:
          </label>
          <input
            ref={nameRef}
            type="text"
            name="fullName"
            placeholder="Enter full name"
            className="mb-8 w-full rounded-3xl bg-white p-2 px-4 text-black dark:bg-black-500 dark:text-white"
          />

          <label htmlFor="email" className="ml-2 mb-2">
            Email:
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="mb-8 w-full rounded-3xl bg-white p-2 px-4 text-black dark:bg-black-500 dark:text-white"
          />

          <label htmlFor="password" className="ml-2 mb-2">
            Password:
          </label>
          <div className="felx-row mb-8 flex w-full justify-between rounded-3xl bg-white p-2 px-4 dark:bg-black-500">
            <input
              ref={passwordRef}
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="bg-white text-black dark:bg-black-500 dark:text-white"
            />
            {showPass ? (
              <FaEye
                className="text-slate-500"
                size="1.5rem"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <FaEyeSlash
                className="text-slate-500"
                size="1.5rem"
                onClick={() => setShowPass(true)}
              />
            )}
          </div>

          <button
            type="submit"
            className="mx-auto rounded-3xl bg-white px-4 py-3 font-semibold text-violet-600 transition-all duration-200 ease-in-out hover:scale-110 active:scale-50 dark:bg-violet-600 dark:text-white"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;