import React, { useContext } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const socialMedia = [
  {
    name: "Github",
    link: "https://github.com/Yasir284",
    Icon: FaGithub,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/web_dev_yasir/",
    Icon: FaInstagram,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/yasir-lambawala-2b216a1b9/",
    Icon: FaLinkedin,
  },
];

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="bg-violet-600 dark:bg-[#1b1a19] px-12 py-4 shadow-md shadow-slate-600 dark:shadow-none flex flex-row justify-between items-center transition-all ease-in-out duration-200">
      <div className="flex flex-row items-center gap-6">
        <h1 className="text-2xl text-white font-extrabold">TODO</h1>
      </div>

      {/* Social media links */}
      <ul className="flex flex-row items-center gap-4">
        <li>
          <button
            className="shadow-md shadow-slate-900 px-4 py-2 rounded-3xl  bg-[#1b1a19] dark:bg-violet-600 text-white flex flex-row items-center gap-4 transition-all ease-in-out duration-200 active:scale-50"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <FaMoon size="1.5rem" />
            ) : (
              <FaSun size="1.5rem" />
            )}
            <span>Theme</span>
          </button>
        </li>
        {socialMedia.map(({ name, link, Icon }) => {
          return (
            <li
              key={name}
              className="text-white transition-all ease-in-out duration-200 active:scale-50"
            >
              <a href={link}>
                <Icon size="2rem" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
