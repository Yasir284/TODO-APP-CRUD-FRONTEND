import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

// Contexts
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";

// Components
import Loader from "./components/modals/Loader";
const MainSection = lazy(() => import("./components/MainSection"));
const Navbar = lazy(() => import("./components/Navbar"));
const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const TasksSection = lazy(() => import("./components/TasksSection"));

axios.defaults.baseURL = "https://todo-app-crud-backend.onrender.com";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  Authorization: sessionStorage.getItem("bearerToken"),
};

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loader, setLoader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      document.getElementById("toggle").removeAttribute("checked", false);
    } else {
      document.documentElement.classList.remove("dark");
      document.getElementById("toggle").setAttribute("checked", true);
    }
  }, [theme]);

  // Show loader function
  const showLoader = () => {
    setLoader(true);
  };
  // Hide loader function
  const hideLoader = () => {
    setLoader(false);
  };

  // Check if user is signed in
  // const checkIsSignedIn = async (navigate) => {
  // if (
  //   JSON.parse(localStorage.getItem("userInfo")) &&
  //   JSON.parse(localStorage.getItem("userInfo")) !== (null || undefined || "")
  // ) {
  //   console.log("hello");
  //   setIsSignedIn(true);
  //   setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  //   return;
  // }
  // const { data } = await axios
  //   .get("/todo/u/isSignedIn")
  //   .catch((error) => error.response);
  // if (!data.success) {
  //   setIsSignedIn(false);
  //   navigate("/signIn");
  //   return;
  // }
  // setUserInfo(data.user);
  // setIsSignedIn(true);
  // };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo"))) {
      navigate("/signIn");
      return;
    }
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    setIsSignedIn(true);
  }, [navigate]);

  return (
    <>
      <UserContext.Provider
        value={{
          isSignedIn,
          setIsSignedIn,
          userInfo,
          setUserInfo,
          showLoader,
          hideLoader,
        }}
      >
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme={theme === "dark" ? "dark" : "light"}
          />
          <Navbar />

          {loader && <Loader />}

          <AnimatePresence>
            <Suspense fallback={<Loader />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainSection />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/tasks/:todoId" element={<TasksSection />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
