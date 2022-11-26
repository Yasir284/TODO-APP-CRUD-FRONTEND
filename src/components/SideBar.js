import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineLightMode,
  MdStarBorder,
  MdHome,
  MdOutlineAdd,
} from "react-icons/md";

const list = [
  {
    Icon: MdOutlineLightMode,
    name: "My Day",
  },
  {
    Icon: MdStarBorder,
    name: "Important",
  },
];

function SideBar() {
  const [todoData, setTodoData] = useState();

  const getTodos = async () => {
    const { data } = await axios.get("/getTodo");

    if (data.todos.length > 0) {
      setTodoData(data.todos);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="basis-1/4 py-8 bg-white dark:bg-[#252423] text-black dark:text-white shadow-xl shadow-black">
      <ul className="flex flex-col">
        {list.map(({ name, Icon }, index) => {
          return (
            <li
              key={index}
              className="pl-12 py-3 transition-all ease-in-out duration-200 hover:bg-violet-50 dark:hover:bg-[#3b3a39]"
            >
              <div className="flex flex-row items-center gap-4">
                <Icon size="1.4rem" />
                <p>{name}</p>
              </div>
            </li>
          );
        })}

        <li className="mt-12 px-12 py-3 transition-all ease-in-out duration-200 bg-[#faf9f8] dark:bg-[#3b3a39]">
          <div className="flex flex-row items-center gap-4">
            <MdHome size="1.4rem" />
            <p>Todos</p>
          </div>
        </li>

        {todoData &&
          todoData.map((todo) => {
            return (
              <li className="pl-12 py-3 transition-all ease-in-out duration-200 hover:bg-violet-50 dark:hover:bg-[#3b3a39]">
                <p>{todo.title}</p>
              </li>
            );
          })}

        <li className="pl-12 text-violet-600 transition-all ease-in-out duration-200 hover:bg-violet-50 dark:hover:bg-[#3b3a39]">
          <form className="flex flex-row items-center gap-4">
            <MdOutlineAdd size="1.4rem" />
            <input
              type="text"
              placeholder="New Todo"
              className="py-3 w-full dark:bg-[#252423] transition-all ease-in-out duration-200 hover:bg-violet-50 dark:hover:bg-[#3b3a39] text-black dark:text-white"
            />
          </form>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
