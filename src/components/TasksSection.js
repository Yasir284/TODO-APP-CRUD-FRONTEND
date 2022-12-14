import axios from "axios";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

import {
  MdAdd,
  MdArrowBackIosNew,
  MdCheckCircle,
  MdClose,
  MdColorLens,
  MdEditNote,
  MdKeyboardArrowRight,
  MdMoreHoriz,
  MdOutlineArrowDropDown,
  MdOutlineCircle,
  MdOutlineDelete,
  MdSearch,
  MdStar,
  MdStarOutline,
} from "react-icons/md";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateTask from "./modals/UpdateTask";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

const taskListVarient = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { ease: "easeInOut", duration: 1 } },
};

const containerVarient = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.5 } },
  exit: { opacity: 0 },
};

export default function TasksSection() {
  const [active, setActive] = useState(false);
  const [todo, setTodo] = useState(null);
  const [updateModal, setUpdateModal] = useState({
    active: false,
    taskId: null,
  });
  const [changeTitle, setChangeTitle] = useState(false);
  const [theme, setTheme] = useState(null);
  const { todoId } = useParams();
  const taskRef = useRef();
  const titleRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();

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

  // Rename todo
  const handleRename = async (e) => {
    e.preventDefault();

    const { data } = await axios
      .put(`/todo/updateTodo/${todoId}`, { title: titleRef.current.value })
      .catch((error) => error.response);

    if (!data.success) {
      return toast("Failed to update title", { type: "error" });
    }

    todoById(todoId);
    titleRef.current.value = "";
    setChangeTitle(false);
    toast("Title Updated", { type: "success" });
  };

  // Delete todo
  const deleteTodo = async () => {
    let text = "Are you sure you want to delete entire todo?";

    if (!window.confirm(text)) {
      return;
    }

    const { data } = await axios
      .delete(`/todo/deleteTodo/${todoId}`)
      .catch((error) => error.response);

    if (!data.success) {
      return toast("Failed to delete todo", { type: "error" });
    }

    navigate("/");
    toast("Todo deleted", { type: "info" });
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
  const deleteTask = async (taskId) => {
    const { data } = await axios
      .delete(`/todo/tasks/deleteTask/${todoId}/${taskId}`)
      .catch((error) => error.response);

    if (!data.success) {
      return toast("Failed to delete task", { type: "error" });
    }

    todoById(todoId);
    toast("Task deleted", { type: "info" });
  };

  // Complete Task
  const handleIsCompleted = async (isCompleted, taskId) => {
    const { data } = await axios
      .put(`/todo/tasks/UpdateTask/${taskId}`, { isCompleted: !isCompleted })
      .catch((error) => error.response);

    if (!data.success) {
      return toast(data.message, { type: "error" });
    }
    todoById(todoId);
  };

  // Important Task
  const handleIsImportant = async (isImportant, taskId) => {
    const { data } = await axios
      .put(`/todo/tasks/UpdateTask/${taskId}`, { isImportant: !isImportant })
      .catch((error) => error.response);

    if (!data.success) {
      return toast(data.message, { type: "error" });
    }
    todoById(todoId);
  };

  // Search Todo
  const handleSearch = async (e) => {
    e.preventDefault();
    let search = searchRef.current.value;

    if (!search) {
      return todoById(todoId);
    }

    const { data } = await axios
      .post(`/todo/tasks/searchTasks/${todoId}`, { search })
      .catch((error) => error.response);

    if (!data.success || data?.todo?.tasks?.length === 0) {
      return toast("Task not found", { type: "info" });
    }

    setTodo(data.todo);
  };

  useEffect(() => {
    todoById(todoId);
  }, [todoId]);

  const selectTheme = [
    {
      style:
        "shadow-lg shadow-slate-400 dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-violet-600",
      changeTheme: () => updateTheme("violet"),
    },
    {
      style:
        "shadow-lg shadow-slate-400 dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-red-600",
      changeTheme: () => updateTheme("red"),
    },
    {
      style:
        "shadow-lg shadow-slate-400 dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-green-600",
      changeTheme: () => updateTheme("green"),
    },
    {
      style:
        "shadow-lg shadow-slate-400 dark:shadow-black active:scale-50 hover:scale-125 transition-all ease-in-out duration-200 w-6 h-6 rounded-full bg-split-white-black",
      changeTheme: () => updateTheme("black-white"),
    },
  ];

  return (
    <motion.div
      variants={containerVarient}
      initial="initial"
      animate="animate"
      className={`relative flex flex-row justify-center ${
        theme
          ? theme === "black-white"
            ? "text-black dark:text-white"
            : `text-${theme}-600`
          : "text-violet-600 dark:text-white"
      }`}
    >
      <div className="w-[80%] basis-3/4 bg-violet-50 p-12 dark:bg-black-900">
        {/**********HEADING***********/}
        <div className="mb-12 flex flex-row items-center justify-between border-b-2 pb-2">
          <div className="flex flex-row items-center gap-6">
            {changeTitle ? (
              <form
                onSubmit={handleRename}
                className="flex h-10 flex-row items-center rounded-3xl bg-white px-4 shadow-md shadow-slate-200 dark:bg-black-700 dark:shadow-black"
              >
                <MdAdd size="1.5rem" type="submit" />
                <input
                  ref={titleRef}
                  placeholder="Add new title"
                  className="bg-transparent p-2"
                />
                <MdClose onClick={() => setChangeTitle(false)} size="1.5rem" />
              </form>
            ) : (
              <h1 className="text-3xl font-extrabold">
                {todo ? todo.title : "Title"}
              </h1>
            )}

            <div className="relative">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white dark:hover:bg-black-700"
                onClick={() => setActive(!active)}
              >
                {active ? (
                  <MdClose size="1.2rem" />
                ) : (
                  <MdMoreHoriz size="1.2rem" />
                )}
              </button>

              <ul
                className={`absolute left-0 top-8 cursor-pointer flex-col items-start justify-center rounded-md bg-white text-sm shadow-md shadow-slate-400 dark:bg-black-700 dark:shadow-black ${
                  active ? "flex" : "hidden"
                }`}
              >
                <li
                  onClick={() => {
                    setChangeTitle(true);
                    setActive(false);
                  }}
                  className="flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-black transition-all duration-200 ease-in-out hover:bg-[#F9F9F9]  dark:text-white dark:hover:bg-black-500"
                >
                  <MdEditNote size="1.2rem" />
                  <span>Rename List</span>
                </li>

                <li className="group flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-black transition-all duration-200 ease-in-out hover:bg-[#F9F9F9] dark:text-white dark:hover:bg-black-500">
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

                <li
                  onClick={deleteTodo}
                  className="flex w-52 flex-row items-center gap-4 rounded-md py-4 pl-6 text-red-600 transition-all duration-200 ease-in-out hover:bg-[#F9F9F9] dark:hover:bg-black-500"
                >
                  <MdOutlineDelete size="1.2rem" />
                  <span>Delete List</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-row items-center gap-6">
            <form
              onSubmit={handleSearch}
              className="flex h-10 flex-row items-center gap-6 rounded-3xl bg-white px-4 shadow-md shadow-slate-200 dark:bg-black-700 dark:shadow-black"
            >
              <input
                onChange={handleSearch}
                ref={searchRef}
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

        {/* Tasks In Progress */}
        <div className="mt-10">
          <div className="flex flex-row items-center gap-4 border-b-2 pb-1 font-semibold dark:border-black-500">
            <MdOutlineArrowDropDown size="1.5rem" />
            <p>In Progress</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs shadow-md shadow-slate-200 dark:bg-black-700 dark:shadow-black">
              {todo ? todo.tasks.filter((e) => !e.isCompleted).length : 0}
            </div>
          </div>
          <ul className="my-6">
            {todo && todo.tasks.length > 0
              ? todo.tasks
                  .filter((e) => !e.isCompleted)
                  .sort((a, b) => Number(b.isImportant) - Number(a.isImportant))
                  .map((e, i) => (
                    <motion.li
                      variants={taskListVarient}
                      layout
                      key={i}
                      className="mb-3 flex flex-row justify-between rounded-md bg-white px-4 py-3 shadow-md shadow-slate-200 hover:bg-[#F9F9F9] dark:bg-black-700 dark:shadow-black dark:hover:bg-black-500"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <MdOutlineCircle
                          onClick={() =>
                            handleIsCompleted(e.isCompleted, e._id)
                          }
                          size="1.5rem"
                        />
                        <p>{e.task}</p>
                      </div>

                      <div className="flex flex-row items-center gap-2">
                        <RiEditBoxLine
                          onClick={() => {
                            setUpdateModal({ active: true, taskId: e._id });
                          }}
                          title="Edit Task"
                          className="text-emerald-400"
                          size="1.5rem"
                        />
                        <RiDeleteBin6Line
                          onClick={() => deleteTask(e._id)}
                          title="Delete Task"
                          className="text-red-400"
                          size="1.5rem"
                        />
                        {e.isImportant ? (
                          <MdStar
                            onClick={() =>
                              handleIsImportant(e.isImportant, e._id)
                            }
                            size="1.5rem"
                            className={`dark:text-white text-${theme}`}
                          />
                        ) : (
                          <MdStarOutline
                            onClick={() =>
                              handleIsImportant(e.isImportant, e._id)
                            }
                            size="1.5rem"
                            className={`dark:text-white text-${theme}`}
                          />
                        )}
                      </div>
                    </motion.li>
                  ))
              : ""}
          </ul>
        </div>

        {/* Tasks Completed */}
        <div className="mt-10">
          <div className="flex flex-row items-center gap-4 border-b-2 pb-1 font-semibold  dark:border-black-500">
            <MdOutlineArrowDropDown size="1.5rem" />
            <p>Completed</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs shadow-md shadow-slate-200 dark:bg-black-700 dark:shadow-black">
              {todo ? todo.tasks.filter((e) => e.isCompleted).length : 0}
            </div>
          </div>

          <ul className="my-6">
            {todo && todo.tasks.length > 0
              ? todo.tasks
                  .filter((e) => e.isCompleted)
                  .map((e) => (
                    <motion.li
                      variants={taskListVarient}
                      layout
                      key={e._id}
                      className="mb-3 flex flex-row justify-between rounded-md bg-white px-4 py-3 line-through shadow-md shadow-slate-200 hover:bg-[#F9F9F9] dark:bg-black-700 dark:shadow-black dark:hover:bg-black-500"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <MdCheckCircle
                          onClick={() =>
                            handleIsCompleted(e.isCompleted, e._id)
                          }
                          size="1.5rem"
                        />
                        <p>{e.task}</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <RiEditBoxLine
                          onClick={() => {
                            setUpdateModal({ active: true, taskId: e._id });
                          }}
                          className="text-emerald-400"
                          size="1.5rem"
                        />
                        <RiDeleteBin6Line
                          onClick={() => deleteTask(e._id)}
                          className="text-red-400"
                          size="1.5rem"
                        />
                        <MdStarOutline
                          onClick={() =>
                            handleIsImportant(e.isImportant, e._id)
                          }
                          size="1.5rem"
                          className={`dark:text-white text-${theme}`}
                        />
                      </div>
                    </motion.li>
                  ))
              : ""}
          </ul>
        </div>
      </div>

      {/* Update Task Modal */}
      <UpdateTask
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        todoId={todoId}
        todoById={todoById}
      />

      {/* Back button */}
      <NavLink
        to="/"
        className={`fixed left-[5%] top-[50%] my-auto rounded-full border-2 p-3 shadow-md shadow-slate-200 transition-all duration-200 ease-in-out hover:bg-violet-600 hover:text-white dark:text-white dark:shadow-black dark:hover:bg-white dark:hover:text-black`}
      >
        <MdArrowBackIosNew size="1.5rem" />
      </NavLink>
    </motion.div>
  );
}
