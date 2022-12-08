import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Contexts
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";

// Components
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

function App() {
  const [theme, setTheme] = useState("light");
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Check if user is signed in
  const checkIsSignedIn = async () => {
    const res = await axios
      .get("/todo/u/isSignedIn")
      .catch((error) => error.response);
    console.log("signIn response:", res);

    if (res.data.success) {
      return setIsSignedIn(true);
    }
    setIsSignedIn(false);
  };

  useEffect(() => {
    checkIsSignedIn();
  }, [setIsSignedIn]);

  return (
    <>
      <UserContext.Provider value={{ isSignedIn, setIsSignedIn }}>
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
      </UserContext.Provider>
    </>
  );
}

export default App;
