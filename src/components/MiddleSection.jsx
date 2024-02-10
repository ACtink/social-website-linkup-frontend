import Box from "@mui/material/Box";

import React from "react";
import RenderPosts from "./RenderPosts";

function MiddleSection({ posts, setPosts, error }) {
  return (
    <Box
      sx={{
        display: { sm: "flex", md:"flex"},
        flexGrow: 3,
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        background: "linear-gradient(to top, #09203f 0%, #537895 100%)"
        
    

        
      }}
    >
      <RenderPosts posts={posts} setPosts={setPosts} error={error} />
      
    </Box>
  );
}

export default MiddleSection;
