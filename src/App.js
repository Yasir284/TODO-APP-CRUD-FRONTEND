import React, { useEffect, useState } from "react";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Navbar />
        <div className="flex flex-row h-[100vh]">
          <SideBar />
          <MainSection />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
