// import axios from "axios";
import axios from "axios";
import React from "react";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;

function UserProfile({ isSignedIn, setIsSignedIn }) {
  // Log out function
  const handleLogOut = async () => {
    const res = await axios
      .get("/todo/u/signOut")
      .catch((error) => error.response);
    console.log(res);
    if (!res.data.success) {
      return toast(res.data.message, { type: "error" });
    }

    setIsSignedIn(false);
    return toast(res.data.message, { type: "info" });
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-center text-xl font-bold text-violet-600 dark:bg-violet-600 dark:text-white">
        Y
      </div>

      <div
        onClick={handleLogOut}
        className="rounded-3xl px-4 py-2 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-white hover:text-red-600 active:scale-50 dark:hover:bg-red-600 dark:hover:text-white"
      >
        <span className="cursor-pointer">Sign out</span>
        <MdLogout size="1.5rem" className="ml-2 inline-block" />
      </div>
    </div>
  );
}

export default UserProfile;
