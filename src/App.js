import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

// Contexts
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";

// Components
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TasksSection from "./components/TasksSection";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

function App() {
  const [theme, setTheme] = useState("dark");
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Check if user is signed in
  const checkIsSignedIn = async () => {
    const { data } = await axios
      .get("/todo/u/isSignedIn")
      .catch((error) => error.response);
    console.log("signIn response:", data);

    if (!data.success) {
      setIsSignedIn(false);
      return toast("Sign in/Sign up first", { type: "warning" });
    }

    setUserInfo(data.user);
    setIsSignedIn(true);
  };

  // Get user info

  useEffect(() => {
    checkIsSignedIn();
  }, [setIsSignedIn]);

  return (
    <>
      <UserContext.Provider value={{ isSignedIn, setIsSignedIn, userInfo }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme={theme === "dark" ? "dark" : "light"}
          />
          <Navbar />
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate replace to="/todo" />} />
              <Route path="/todo" element={<MainSection />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/todo/tasks/:todoId" element={<TasksSection />} />
            </Routes>
          </AnimatePresence>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
