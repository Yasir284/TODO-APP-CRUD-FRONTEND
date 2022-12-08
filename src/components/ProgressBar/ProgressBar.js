import React from "react";
import "./ProgressBar.css";

function ProgressBar() {
  return (
    <div className="relative flex h-[151px] w-[151px] items-center justify-center rounded-full bg-violet-50 bg-transparent p-3 shadow-xl shadow-slate-500 dark:bg-black-900 dark:shadow-slate-400">
      <div className="dark:black-900 flex h-full w-full flex-col items-center justify-center rounded-full bg-violet-50 font-bold text-violet-600 shadow-inner shadow-slate-200 dark:bg-black-900 dark:shadow-black-500">
        <p className="font">60%</p>
        <p>Done</p>
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
            <stop offset="0%" stop-color="#7c3aed" />
            <stop offset="50%" stop-color="#c4b5fd" />
            <stop offset="100%" stop-color="#673ab7" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r="70"
          strokeLinecap="round"
          strokeDasharray="437"
          strokeDashoffset={`${437 - 437 * 0.6}`}
          strokeWidth="12px"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );
}

export default ProgressBar;
