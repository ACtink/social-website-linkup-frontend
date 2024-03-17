import React from "react";
import axios from "axios";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import SignOutButton from "./SignOutButton";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/ContextProvider";

function SignOut({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [userName, setUserName, userId, setUserId , setUserProfile] =
    React.useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");

    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post("/auth/signout");

      if (response.data) {
        localStorage.clear();
        setUserProfile({})
        setIsLoggedIn(false);

        const data = await response.data;
        console.log("Data from the server:", data);
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.status : err.message);
    }
  };

  return (
    <>
      <LeftSide />
      <SignOutButton handleSubmit={handleSubmit} />
      <RightSide />
    </>
  );
}

export default SignOut;
