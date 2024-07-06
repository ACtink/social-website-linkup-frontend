import Box from "@mui/material/Box";

import React from "react";
import RenderPosts from "./RenderPosts";

function MiddleSection({ posts, setPosts, error , loading , currentPageRef }) {
  return (


    <Box >


      <RenderPosts posts={posts} setPosts={setPosts} error={error} loading={loading} currentPageRef={currentPageRef} />


      </Box>


  );
}

export default MiddleSection;
