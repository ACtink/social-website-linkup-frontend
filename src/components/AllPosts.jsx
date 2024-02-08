import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>All Tweets</h1>

      <h1>{error && error}</h1>
      <div className="overflow-scroll py-4">
        {allPosts &&
          allPosts.map((post, indx) => {
            return (
              <div key={indx} className="h-4  my-2 mx-auto ">
                <h2 className="text-yellow-300 text-2xl h-10 text-center max-w-96 bg-green-500 mx-auto rounded-3xl my-12">
                  {post.postbody}
                </h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllPosts;
