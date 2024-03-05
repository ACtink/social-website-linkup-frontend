import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { Box } from "@mui/material";
import MiddleSection from "./MiddleSection";
import Loading from "./Loading";

function AllPosts() {
  const [allPosts, setAllPosts] = useState(null);
  const [error, setError] = useState("");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false); // New state to track if all posts have been fetched

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/posts?page=${page}&limit=10`);
      if (response.data.length === 0) {
        // If no more posts are returned, set reachedEnd to true
        setReachedEnd(true);
      } else {
        setPage((prev) => prev + 1);
        setPosts([...posts, ...response.data]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !loading &&
        !reachedEnd // Ensure not loading and not reached end before fetching more posts
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, reachedEnd]); // Update the effect dependencies

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
      {loading && <Loading />}
      <MiddleSection posts={posts} setPosts={setPosts} error={error} />
      {reachedEnd && (
        <Box sx={{marginBottom:"100px"}} textAlign="center">You've reached the end of the posts.</Box>
      )}
      <RightSide />
    </Box>
  );
}

export default AllPosts;
