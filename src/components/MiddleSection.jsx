import Box from "@mui/material/Box";

import React from "react";
import RenderPosts from "./RenderPosts";

function MiddleSection({ posts, setPosts, error }) {
  return (


    <Box >


      <RenderPosts posts={posts} setPosts={setPosts} error={error} />


      </Box>


  );
}

export default MiddleSection;
