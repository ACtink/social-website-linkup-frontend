import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderPosts from "./RenderPosts";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import MiddleSection from "./MiddleSection";

function AllPosts() {
  const [allPosts, setAllPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts/");

        if (response?.data) {
          setAllPosts(response.data);
          setError("");
        }
      } catch (err) {
        if (err.response?.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Server is Down , Can't fetch Posts now");
        }
      }
    };

    getAllPosts();
  }, []);

  return (
    <Box sx={{ display: { xs: "flex", md: "flex" },justifyContent:"space-between" }}>
      <LeftSide />

      <MiddleSection posts={allPosts} setPosts={setAllPosts} error={error}/>

   

      <RightSide />
    </Box>
  );
}

export default AllPosts;
