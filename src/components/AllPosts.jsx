import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { Box } from "@mui/material";
import MiddleSection from "./MiddleSection";
import Loading from "./Loading";
import { useAxiosForToken } from "../hooks/useAxiosForToken";

function AllPosts() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

    const privateAxios = useAxiosForToken();


  const fetchPosts = async () => {

    console.log("calling first time")
    setLoading(true);

    console.log("value of page " ,page)
    try {

      console.log("calling getpost with page value" , page)
      privateAxios.defaults.withCredentials = true;
      const response = await privateAxios.get(`/posts?page=${page}&limit=10`);
      if (response?.data.length === 0) {
        setReachedEnd(true);
      } else {
        console.log(response.data)
              setError("");
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setPage((prevPage) => prevPage + 1); // Use functional update to ensure correct value of page
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
    }
    setLoading(false);
  };


  useEffect(() => {

      console.log("calling fetchPosts in first useEffect");


      fetchPosts();

  
    
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading &&
        !reachedEnd
      ) {
            console.log("calling fetchPosts in second useEffect");

        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, reachedEnd]); // Include page, loading, and reachedEnd in the dependency array

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "flex" },
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <LeftSide />
      {loading && <Loading marginValue={700} />}
      <MiddleSection posts={posts} setPosts={setPosts} error={error} />
      {reachedEnd && (
        <Box sx={{ marginBottom: "100px" }} textAlign="center">
          You've reached the end of the posts.
        </Box>
      )}
      <RightSide />
    </Box>
  );
}

export default AllPosts;
