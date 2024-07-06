import React, { useEffect, useRef, useState } from "react";
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
  const currentPageRef = useRef(1);

  const privateAxios = useAxiosForToken();

  const fetchPosts = async () => {
    if (loading || reachedEnd) return; // Prevent concurrent calls
    setLoading(true);

 
    try {
      console.log("calling getpost with page value", currentPageRef.current);
      privateAxios.defaults.withCredentials = true;
      const response = await privateAxios.get(
        `/posts?page=${currentPageRef.current}&limit=10`
      );
      await new Promise((res) => setTimeout(res, 1000)); // Simulating delay

      if (response?.data.length === 0) {
        setReachedEnd(true);
      } else {
        setError("");
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
        currentPageRef.current += 1; // Increment the page ref after successful fetch
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
  }, [loading, reachedEnd]);


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
      {loading  && currentPageRef===1 && <Loading marginValue={900} />}
      <MiddleSection loading={loading} posts={posts} setPosts={setPosts} error={error} currentPageRef={currentPageRef} />
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
