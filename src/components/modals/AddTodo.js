import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
axios.defaults.baseURL = "http://localhost:4001";

function AddTodo({ showAddTodo, setShowAddTodo }) {
  const titleRef = useRef();
  const taskRef = useRef();
  const [tasks, setTasks] = useState([]);

  const createTodo = async () => {
    const title = titleRef.current.value;
    const data = {
      title,
      tasks,
    };
    console.log(data);

    const todo = await axios
      .post("/todo/createTodo", data)
      .catch((error) => error.response);
    console.log(todo);

    if (!todo.data.success) {
      return toast(todo.data.message, { type: "error" });
    }

    toast(todo.data.message, { type: "success" });

    titleRef.current.value = "";
    taskRef.current.value = "";
    setTasks([]);
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = { task: taskRef.current.value };

    if (!newTask) {
      return toast("Cann't empty task", { type: "warning" });
    }

    setTasks([...tasks, newTask]);

    taskRef.current.value = "";
  };

  const deleteTask = (index) => {
    const updateTasks = tasks.filter((e, i) => i !== index);
    console.log(updateTasks);

    setTasks(updateTasks);
  };

  return (
    <>
      {showAddTodo && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="relative flex w-1/3 flex-col items-center rounded-3xl bg-violet-700 p-10 shadow-lg shadow-slate-500 dark:bg-black-700 dark:shadow-black">
            <h1 className="mb-10 w-full border-b-2 pb-2 text-center text-2xl font-bold dark:border-black-500">
              Create Todo
            </h1>

            <MdClose
              onClick={() => setShowAddTodo(false)}
              className="absolute top-6 right-8 active:scale-50"
              size="1.5rem"
            />

            <form className="flex w-full flex-col items-center justify-center gap-4">
              <input
                ref={titleRef}
                type="text"
                placeholder="Todo Title"
                className="w-full border-b-2 bg-transparent text-xl text-white placeholder-white"
              />

              <div className="mb-4 flex w-full flex-row items-center gap-4 rounded-3xl border-2 border-white bg-white pl-4 dark:bg-black-500">
                <MdAdd
                  size="1.5rem"
                  className="text-violet-600 dark:text-white"
                />
                <input
                  ref={taskRef}
                  type="text"
                  placeholder="Add Task"
                  className="bg-transparent py-1 text-black dark:text-white"
                />
                <button
                  type="button"
                  onClick={addTask}
                  className="ml-14 rounded-3xl bg-violet-600 px-6 py-2 font-semibold text-white transition-all duration-200 ease-in-out hover:scale-110 active:scale-50 dark:bg-violet-600 dark:text-white"
                >
                  Add
                </button>
              </div>
            </form>

            <div className="mb-4 h-72 w-full overflow-y-scroll rounded-md border-2 border-white p-2">
              <ul className="w-full">
                {tasks.length > 0 ? (
                  tasks.map((e, index) => (
                    <li
                      key={index}
                      className="mb-2 flex flex-row justify-between rounded-3xl border-2 border-white py-1 px-4"
                    >
                      <p>{e.task}</p>
                      <button
                        onClick={() => deleteTask(index)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="mt-4 text-center">No tasks added</p>
                )}
              </ul>
            </div>

            <button
              onClick={createTodo}
              className="w-full rounded-md border-2 border-white py-1 transition-all duration-200 ease-in-out hover:bg-white hover:text-violet-600 active:scale-50 dark:hover:text-black"
            >
              Create Todo
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTodo;