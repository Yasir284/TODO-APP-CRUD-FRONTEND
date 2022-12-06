import React, { useState } from "react";
import {
  MdColorLens,
  MdEditNote,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdOutlineDelete,
} from "react-icons/md";

export default function TasksSection() {
  const [active, setActive] = useState(false);
  const [textTheme, setTextTheme] = useState(null);

  const selectTheme = [
    {
      style:
        "shadow-lg hover:shadow-slate-400 dark:shadow-black active:scale-50 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-violet-600",
      changeTheme: () => setTextTheme("violet"),
    },
    {
      style:
        "shadow-lg hover:shadow-slate-400 dark:shadow-black active:scale-50 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-red-600",
      changeTheme: () => setTextTheme("red"),
    },
    {
      style:
        "shadow-lg hover:shadow-slate-400 dark:shadow-black active:scale-50 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-green-600",
      changeTheme: () => setTextTheme("green"),
    },
    {
      style:
        "shadow-lg hover:shadow-slate-400 dark:shadow-black active:scale-50 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-blue-600",
      changeTheme: () => setTextTheme("blue"),
    },
  ];

  const theme = () => {
    switch (textTheme) {
      case "violet":
        return "text-violet-600";

      case "red":
        return "text-red-600";

      case "green":
        return "text-green-600";

      case "blue":
        return "text-blue-600";

      default:
        return "text-black dark:text-white";
    }
  };

  const containerStyle = () => {
    return ["p-12 basis-3/4 bg-[#faf9f8] dark:bg-[#111111]", theme()].join(" ");
  };
  console.log(containerStyle());

  return (
    <div className={containerStyle()}>
      <div className="mb-12 flex flex-row items-center gap-6">
        <h1 className="text-2xl font-semibold">Todo Title</h1>
        <div className="relative">
          <button
            className="flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-black-700 w-8 h-8"
            onClick={() => setActive(!active)}
          >
            <MdMoreHoriz size="1.2rem" />
          </button>

          <ul
            className={`absolute left-0 top-8 rounded-md shadow-md shadow-slate-400 dark:shadow-black cursor-pointer text-sm bg-white dark:bg-black-700 flex-col justify-center items-start ${
              active ? "flex" : "hidden"
            }`}
          >
            <li className="flex flex-row items-center gap-4 pl-6 py-4 rounded-md text-black dark:text-white hover:bg-[#faf9f8] w-52 dark:hover:bg-black-500">
              <MdEditNote size="1.2rem" />
              <span>Rename List</span>
            </li>

            <li className="group flex flex-row items-center gap-4 pl-6 py-4 rounded-md text-black dark:text-white hover:bg-[#faf9f8] w-52 dark:hover:bg-black-500">
              <MdColorLens size="1.2rem" />
              <span>Change Theme</span>
              <MdKeyboardArrowRight size="1.2rem" />
              <div className="absolute top-12 -right-44 group-hover:flex hidden flex-row gap-4 px-4 py-4 rounded-md shadow-md shadow-slate-400 dark:shadow-black cursor-pointer bg-[#faf9f8] dark:bg-black-700">
                {selectTheme.map(({ style, changeTheme }, index) => {
                  return (
                    <div
                      key={index}
                      className={style}
                      onClick={changeTheme}
                    ></div>
                  );
                })}
              </div>
            </li>

            <li className=" flex flex-row items-center gap-4 pl-6 py-4 rounded-md text-red-600 hover:bg-[#faf9f8] w-52 dark:hover:bg-black-500">
              <MdOutlineDelete size="1.2rem" />
              <span>Delete List</span>
            </li>
          </ul>
        </div>
      </div>

      <form className="flex flex-row gap-6">
        <input
          type="text"
          className="basis-2/3 bg-white dark:bg-black-700 rounded-md w-full p-3 shadow-md shadow-slate-300 dark:shadow-black"
          placeholder="Add task"
        />
        <div className="basis-1/3 bg-[#faf9f8] dark:bg-black-700 rounded-md w-full p-3 shadow-md shadow-slate-300 dark:shadow-black">
          <input
            type="date"
            className="bg-white dark:bg-black-700 text-black dark:text-white"
          />
          <button
            type="submit"
            className="bg-white dark:bg-black-500 shadow-md shadow-slate-500 dark:shadow-black ml-4 px-4 py-[5px] rounded-md"
          >
            Add
          </button>
        </div>
      </form>

      <ul>Get Tasks</ul>
    </div>
  );
}
