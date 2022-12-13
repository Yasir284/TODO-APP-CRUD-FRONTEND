import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddTodo from "./modals/AddTodo";
import { toast } from "react-toastify";

import { MdAdd, MdCalendarToday, MdSearch } from "react-icons/md";

import emptySvg from "../images/emptySvg.svg";
import ProgressBar from "./ProgressBar/ProgressBar";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

export default function MainSection() {
  const [todos, setTodos] = useState(null);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const searchRef = useRef();

  // Getting Todos
  const getTodos = async () => {
    const res = await axios
      .get("/todo/getTodos")
      .catch((error) => error.response);
    console.log("todos response:", res);

    if (!res.data.success) {
      return toast(res.data.message, { type: "error" });
    }

    setTodos(res.data.todos);
  };

  // Search Todo
  const handleSearch = async (e) => {
    e.preventDefault();
    let search = searchRef.current.value;

    if (!search) {
      return getTodos();
    }

    const { data } = await axios
      .post("/todo/searchTodos", { search })
      .catch((error) => error.response);

    if (!data.success) {
      return toast("Todo not found", { type: "info" });
    }

    setTodos(data.todos);
  };

  useEffect(() => {
    getTodos();
  }, [setTodos]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full bg-violet-50 px-32 py-12 dark:bg-black-900">
        {/**********HEADING***********/}
        <div className="mb-12 flex flex-row items-center justify-between border-b-2 border-violet-600 pb-2 text-violet-600 dark:border-white dark:text-white">
          <div className="flex flex-row items-center gap-6">
            <h1 className="text-3xl font-extrabold">My Todos</h1>
          </div>

          {/* Search todo */}
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
                placeholder="Search todo"
              />
              <MdSearch type="button" size="1.5rem" />
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
        <AddTodo
          showAddTodo={showAddTodo}
          setShowAddTodo={setShowAddTodo}
          setTodos={setTodos}
          todos={todos}
        />

        {/* Todo List */}
        {todos && todos.length > 0 ? (
          <ul className="flex flex-row flex-wrap justify-center gap-12">
            {todos.map((todo, i) => (
              <NavLink key={i} to={`/todo/tasks/${todo._id}`}>
                <motion.li
                  layout
                  transition={{ type: "spring", stiffness: 90 }}
                  className="flex flex-row text-violet-700 dark:text-white"
                >
                  <div className="flex flex-row justify-between rounded-3xl bg-violet-100 p-10 shadow-xl shadow-slate-300 transition-all duration-200 ease-in-out hover:-translate-y-2 hover:scale-110 dark:bg-black-700 dark:shadow-black">
                    <div className="">
                      <h1 className="mb-5 text-2xl font-bold">{todo.title}</h1>
                      <p className="ml-2 mb-1">
                        🚀 <span>{todo.tasks.length}</span> Tasks
                      </p>
                      <p className="ml-2">
                        🔥
                        <span>
                          {todo.tasks.filter((e) => e.isCompleted).length}
                        </span>{" "}
                        Done
                      </p>

                      <div className="ml-2 mt-4 flex flex-row items-center gap-2">
                        <MdCalendarToday />
                        <span>
                          Created at :{" "}
                          {new Date(todo.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <ProgressBar
                      percentage={
                        (todo.tasks.filter((e) => e.isCompleted).length * 100) /
                        todo.tasks.length
                      }
                    />
                  </div>
                </motion.li>
              </NavLink>
            ))}
          </ul>
        ) : (
          <img
            src={emptySvg}
            alt="empty svg"
            className="mx-auto w-[55%] animate-pulse"
          />
        )}
      </div>
    </div>
  );
}
