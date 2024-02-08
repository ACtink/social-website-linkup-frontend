import React, { useEffect, useState } from "react";
import axios from "axios";
import DeletePost from "./DeletePost";

function RenderPosts() {
  const [myPosts, setMyPosts] = useState(null);
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
          setMyPosts(response.data);
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
    <div className="overflow-scroll h-72  ">
      {myPosts &&
        myPosts.map((post, indx) => {
          return (
            <div key={indx} className="p-2 group bg-lime-200 m-3 ">
              <h1 className="p-3 my-2">
                {post.postbody}
              </h1>
              <div className=" border-2 border-cyan-950 hidden group-hover:block ">
                <DeletePost myPosts={myPosts} setMyPosts={setMyPosts}  postId={post._id} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default RenderPosts;
