import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./modals/AddTodo";

import {
  MdAdd,
  MdColorLens,
  MdEditNote,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdOutlineDelete,
  MdSearch,
} from "react-icons/md";
import emptySvg from "../images/emptySvg.svg";

export default function MainSection() {
  const [active, setActive] = useState(false);
  const [textTheme, setTextTheme] = useState(null);
  const [todos, setTodos] = useState(null);
  const [showAddTodo, setShowAddTodo] = useState(false);

  // Getting Todos
  const getTodos = async () => {
    const { data } = await axios
      .get("http://localhost:4001/todo/v1/getTodos")
      .catch(console.log("Error in getting todos"));
    console.log(data.todos);

    setTodos(data.todos);
  };

  useEffect(() => {
    getTodos();
  }, []);

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
    return ["p-12 basis-3/4 bg-violet-50 dark:bg-black-900", theme()].join(" ");
  };
  console.log(containerStyle());

  return (
    <div className={containerStyle()}>
      {/**********HEADING***********/}
      <div className="mb-12 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <h1 className="text-2xl font-semibold">TODOS</h1>
          <div className="relative">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white dark:hover:bg-black-700"
              onClick={() => setActive(!active)}
            >
              <MdMoreHoriz size="1.2rem" />
            </button>

            <ul
              className={`absolute left-0 top-8 cursor-pointer flex-col items-start justify-center rounded-md bg-white text-sm shadow-md shadow-slate-400 dark:bg-black-700 dark:shadow-black ${
                active ? "flex" : "hidden"
              }`}
            >
              <li className="flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-black hover:bg-[#faf9f8] dark:text-white dark:hover:bg-black-500">
                <MdEditNote size="1.2rem" />
                <span>Rename List</span>
              </li>

              <li className="group flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-black hover:bg-[#faf9f8] dark:text-white dark:hover:bg-black-500">
                <MdColorLens size="1.2rem" />
                <span>Change Theme</span>
                <MdKeyboardArrowRight size="1.2rem" />
                <div className="absolute top-12 -right-44 hidden cursor-pointer flex-row gap-4 rounded-md bg-[#faf9f8] px-4 py-4 shadow-md shadow-slate-400 group-hover:flex dark:bg-black-700 dark:shadow-black">
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

              <li className=" flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-red-600 hover:bg-[#faf9f8] dark:hover:bg-black-500">
                <MdOutlineDelete size="1.2rem" />
                <span>Delete List</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-row items-center gap-6">
          <form className="flex h-10 flex-row items-center gap-6 rounded-3xl bg-white px-4 shadow-md shadow-slate-200 dark:bg-black-700 dark:shadow-black">
            <input
              className="bg-transparent"
              type="search"
              placeholder="Search todo"
            />
            <MdSearch type="submit" size="1.5rem" />
          </form>

          <button
            onClick={() => setShowAddTodo(true)}
            className="h-14 w-14 rounded-full bg-white shadow-md shadow-slate-200 transition-all duration-200 ease-out active:scale-50 dark:bg-black-700 dark:shadow-black"
          >
            <MdAdd className="m-auto" size="2.5rem" />
          </button>
        </div>
      </div>

      {/* Add Todo Modal */}
      <AddTodo showAddTodo={showAddTodo} setShowAddTodo={setShowAddTodo} />

      {/* Todo List */}
      <ul>
        <li></li>
      </ul>
    </div>
  );
}
