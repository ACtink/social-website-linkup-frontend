import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useAxiosForToken } from "../hooks/useAxiosForToken";
import { useSignOut } from "../utils/useSignOut";
import RenderPosts from "./RenderPosts";
import { useNavigate } from "react-router-dom";

function Profile({ isLoggedIn, setIsLoggedIn }) {
  const [userPosts, setUserPosts] = useState(null);
  const [error, setError] = useState("");
  const signOut = useSignOut(isLoggedIn, setIsLoggedIn);
  const privateAxios = useAxiosForToken();
  const checkLoginStatus = localStorage.getItem("isLoggedIn") || false;


  const user = localStorage.getItem("userName")
    const navigate = useNavigate();

  if(!isLoggedIn){
    navigate("/")
  }

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        privateAxios.defaults.withCredentials = true;
        const response = await privateAxios.get(`/posts/${user}`);
        if (response?.data) {
          console.log(response.data);
          setUserPosts(response.data);
          setError("");
        }
      } catch (err) {
        if (err.response?.data) {
          console.log("calling singout now ");
          signOut();
          setError(err.response?.data.message);
        } else {
          setError("Server is Down, Can't fetch Your Posts now");
        }
      }
    };

    if (checkLoginStatus) {
      fetchUserPosts();
    } else {
      signOut(checkLoginStatus, setIsLoggedIn);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {error && (
        <Typography variant="h6" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      <LeftSide />

      <RenderPosts posts={userPosts} setPosts={setUserPosts} error={error} />

      <RightSide />
    </Box>
  );
}

export default Profile;
