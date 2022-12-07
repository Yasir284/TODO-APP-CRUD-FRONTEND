import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme={theme === "dark" ? "dark" : "light"}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/todo" />} />
          <Route path="/todo" element={<MainSection />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
