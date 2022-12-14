import React, { useEffect, useState } from "react";
import "./ProgressBar.css";
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";

function ProgressBar({ percentage }) {
  console.log(percentage);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startCount = 0;
    setCount(startCount);
    function loadPercent(percentage) {
      let interval = setInterval(() => {
        if (startCount === Math.round(percentage)) {
          return clearInterval(interval);
        }
        startCount += 1;
        setCount(startCount);
      }, 20);
    }
    loadPercent(percentage);
  }, [percentage]);

  return (
    <div className="relative flex h-[151px] w-[151px] items-center justify-center rounded-full bg-violet-50 bg-transparent p-3 shadow-xl shadow-slate-500 dark:bg-black-700 dark:shadow-black">
      <div className="dark:black-900 flex h-full w-full flex-col items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600 shadow-inner shadow-slate-300 dark:bg-black-700 dark:shadow-black-500">
        {percentage < 100 ? (
          <>
            <p className="font text-2xl">{count}%</p>
            <p className="text-sm">Done</p>
          </>
        ) : (
          <MdCheck size="5rem" />
        )}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="160px"
        height="160px"
        className="absolute"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>
        <motion.circle
          initial={{ strokeDashoffset: 437 }}
          animate={{
            strokeDashoffset: 437 - 437 * (percentage / 100),
          }}
          cx="80"
          cy="80"
          r="70"
          strokeLinecap="round"
          strokeDasharray="437"
          strokeDashoffset={`${437 - 437 * (percentage / 100)}`}
          strokeWidth="12px"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );
}

export default ProgressBar;
