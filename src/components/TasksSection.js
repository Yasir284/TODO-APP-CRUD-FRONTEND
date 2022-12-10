import axios from "axios";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

import {
  MdArrowBackIosNew,
  MdColorLens,
  MdEditNote,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdOutlineArrowDropDown,
  MdOutlineCircle,
  MdOutlineDelete,
  MdSearch,
} from "react-icons/md";
import { RiDeleteBin6Fill, RiEditBoxLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCallback } from "react";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

const taskListVarient = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { ease: "easeInOut", duration: 1 } },
};

export default function TasksSection() {
  const [active, setActive] = useState(false);
  const [todo, setTodo] = useState(null);
  const [theme, setTheme] = useState("black");
  const { todoId } = useParams();
  const taskRef = useRef();

  // Getting todo by id
  const todoById = async (id) => {
    const { data } = await axios
      .get(`/todo/tasks/getTodoById/${id}`)
      .catch((error) => error.response);
    console.log("Todo by id :", data);

    if (!data.success) {
      return toast(data.message, { type: "error" });
    }

    setTheme(data.todo[0].todoTheme);
    setTodo(data.todo[0]);
  };

  // Add Task
  const addTask = async (e) => {
    e.preventDefault();

    if (!taskRef.current.value) {
      return toast("Cann't add empty task", { type: "warning" });
    }

    const res = await axios
      .put(`/todo/tasks/createTask/${todoId}`, { task: taskRef.current.value })
      .catch((error) => error.response);
    console.log(res);
    if (!res.data.success) {
      return toast(res.data.message, { type: "error" });
    }

    todoById(todoId);
    toast("Task added successfully", { type: "success" });

    taskRef.current.value = "";
  };

  // Update Theme
  const updateTheme = async (theme) => {
    const res = await axios
      .put(`/todo/updateTodo/${todoId}`, { todoTheme: theme })
      .catch((error) => error.response);
    console.log("updated theme:", res);

    if (!res.data.success) {
      return toast("Failed to change theme", { type: "error" });
    }

    setTheme(theme);
    todoById(todoId);
    console.log(todo);

    toast("Todo theme changed", { type: "info" });
  };

  // Delete Task

  useEffect(() => {
    todoById(todoId);
  }, [todoId, setTodo]);

  const selectTheme = [
    {
      style:
        "shadow-lg dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-violet-600",
      changeTheme: () => updateTheme("violet"),
    },
    {
      style:
        "shadow-lg dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-red-600",
      changeTheme: () => updateTheme("red"),
    },
    {
      style:
        "shadow-lg dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-green-600",
      changeTheme: () => updateTheme("green"),
    },
    {
      style:
        "shadow-lg dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-blue-600",
      changeTheme: () => updateTheme("blue"),
    },
  ];

  return (
    <div className="relative flex flex-row justify-center">
      <div
        className={`w-[80%] basis-3/4 bg-violet-50 p-12 dark:bg-black-900 text-${theme}-600`}
      >
        {/**********HEADING***********/}
        <div className="mb-12 flex flex-row items-center justify-between border-b-2 pb-2">
          <div className="flex flex-row items-center gap-6">
            <h1 className="text-3xl font-extrabold">TODOS</h1>
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
                <li className="flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-black transition-all duration-200 ease-in-out hover:bg-slate-50 dark:text-white dark:hover:bg-black-500">
                  <MdEditNote size="1.2rem" />
                  <span>Rename List</span>
                </li>

                <li className="group flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-black transition-all duration-200 ease-in-out hover:bg-slate-50 dark:text-white dark:hover:bg-black-500">
                  <MdColorLens size="1.2rem" />
                  <span>Change Theme</span>
                  <MdKeyboardArrowRight size="1.2rem" />

                  <div className="absolute top-12 -right-44 hidden cursor-pointer flex-row gap-4 rounded-md bg-white px-4 py-4 shadow-md shadow-slate-400 group-hover:flex dark:bg-black-700 dark:shadow-black">
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

                <li className="flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-red-600 transition-all duration-200 ease-in-out hover:bg-slate-50 dark:hover:bg-black-500">
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
                placeholder="Search task"
              />
              <MdSearch type="submit" size="1.5rem" />
            </form>
          </div>
        </div>

        {/* Add Task form */}
        <form className="flex flex-row gap-6" onSubmit={addTask}>
          <input
            ref={taskRef}
            type="text"
            className="w-full rounded-md bg-white p-3 shadow-md shadow-slate-200 dark:bg-black-700 dark:shadow-black"
            placeholder="Add task"
          />

          <button
            type="submit"
            className="ml-4 rounded-md bg-white px-4 py-[5px] shadow-md shadow-slate-200 transition-all duration-200 ease-in-out active:scale-50 dark:bg-black-700 dark:shadow-black"
          >
            Add
          </button>
        </form>

        {/* Tasks */}
        <div className="mt-10">
          <div className="border-b-2">
            <MdOutlineArrowDropDown
              size="1.5rem"
              className="mr-2 inline-block"
            />
            <p className="inline-block">In progress</p>
          </div>
          <ul className="my-6">
            {todo && todo.tasks.length > 0
              ? todo.tasks.map((e) => (
                  <motion.li
                    variants={taskListVarient}
                    initial="initial"
                    animate="animate"
                    layout
                    key={e._id}
                    className="mb-3 flex flex-row justify-between rounded-md bg-white px-4 py-3 shadow-md shadow-slate-200  hover:bg-slate-50 dark:bg-black-700 dark:shadow-black dark:hover:bg-black-500"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <MdOutlineCircle size="1.5rem" />
                      <p>{e.task}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <RiEditBoxLine
                        className="text-emerald-400"
                        size="1.5rem"
                      />
                      <RiDeleteBin6Fill
                        className="text-red-400"
                        size="1.5rem"
                      />
                    </div>
                  </motion.li>
                ))
              : ""}
          </ul>
        </div>

        <div className="mt-10">
          <div className="border-b-2">
            <MdOutlineArrowDropDown
              size="1.5rem"
              className="mr-2 inline-block"
            />
            <p className="inline-block">Completed</p>
          </div>
          <ul className="my-6">
            {todo && todo.tasks.length > 0
              ? todo.tasks
                  .filter((e) => e.isCompleted)
                  .map((e) => (
                    <motion.li
                      variants={taskListVarient}
                      initial="initial"
                      animate="animate"
                      layout
                      key={e._id}
                      className="mb-3 flex flex-row justify-between rounded-md bg-white px-4 py-3 shadow-md shadow-slate-200  hover:bg-slate-50 dark:bg-black-700 dark:shadow-black dark:hover:bg-black-500"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <MdOutlineCircle size="1.5rem" />
                        <p>{e.task}</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <RiEditBoxLine
                          className="text-emerald-400"
                          size="1.5rem"
                        />
                        <RiDeleteBin6Fill
                          className="text-red-400"
                          size="1.5rem"
                        />
                      </div>
                    </motion.li>
                  ))
              : ""}
          </ul>
        </div>
      </div>

      {/* Back button */}
      <NavLink
        to="/"
        className={`fixed left-[5%] top-[50%] my-auto rounded-full border-2 p-3 shadow-md shadow-slate-200 transition-all duration-200 ease-in-out hover:bg-violet-600 hover:text-white dark:text-white dark:shadow-black dark:hover:bg-white dark:hover:text-black`}
      >
        <MdArrowBackIosNew size="1.5rem" />
      </NavLink>
    </div>
  );
}
