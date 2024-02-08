import React from "react";
import RenderPosts from "./RenderPosts";
import MiddleSection from "./MiddleSection";
import { useEffect, useState } from "react";
import axios from "axios";

function UserPosts() {




  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      axios.defaults.withCredentials = true;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/posts/myposts"
        );

        if (response?.data) {
          console.log(response.data);
          setPosts(response.data);
          setError("");
        }
      } catch (err) {
        if (err.response?.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Server is Down , Can't fetch Your Posts now");
        }
      }
    };

    fetchUserPosts();
  }, []);








  return (
   
    
    
  <MiddleSection posts={posts} setPosts={setPosts} error={error}/>

  );
}

export default UserPosts;
