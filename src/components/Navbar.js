import axios from "axios";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import logo from "../images/logo.png";
import UserProfile from "./UserProfile";
axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const { isSignedIn, setIsSignedIn } = useContext(UserContext);
  return (
    <nav className="sticky top-0 right-0 z-40 backdrop-blur-sm backdrop-filter ">
      <div className="border-b-2 border-violet-300 bg-violet-800 bg-opacity-20 px-12 py-4 text-violet-600 dark:border-black-500 dark:bg-black dark:bg-opacity-10 dark:text-white">
        <div className="relative flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-8 brightness-0 drop-shadow-lg filter dark:filter-none"
              />
              <h1 className="text-2xl font-extrabold">TODO</h1>
            </div>
          </div>

          <ul className="flex flex-row items-center gap-4">
            <li className="flex flex-row items-center gap-2 border-r-2 pr-6">
              <p className="text-xs font-bold">
                Change <br /> Theme
              </p>
              <div
                className="relative inline-block w-12 select-none align-middle transition duration-200 ease-in"
                title="Change Theme"
              >
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 border-white bg-violet-600 transition-all duration-200 ease-in-out dark:border-black-500 dark:bg-white"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-white shadow-md dark:shadow-black"
                ></label>
              </div>
            </li>

            {isSignedIn ? (
              <UserProfile
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
              />
            ) : (
              <>
                <NavLink to="/signUp">
                  <li className="font-semibold transition-all duration-200 ease-in-out active:scale-50">
                    Sign up
                  </li>
                </NavLink>
                <NavLink to="/signIn">
                  <li className="rounded-3xl bg-white px-4 py-2  font-semibold transition-all duration-200 ease-in-out active:scale-50 dark:bg-violet-600">
                    Sign in
                  </li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
