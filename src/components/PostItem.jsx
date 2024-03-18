import React from "react";
import { Box, Grid } from "@mui/material";
import SinglePostPage from "./SinglePostPage";

function PostItem({ post, index }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <SinglePostPage post={post} isOpen={isModalOpen} onClose={modalHandler} />

      <Grid item xs={6} sm={4} md={3} lg={3} xl={3} key={index}>
        <Box
          style={{
            position: "relative",
            width: "200px", // Fixed width of container
            height: "200px", // Fixed height of container
            border: "1px solid #ccc", // Nice border
            borderRadius: "8px",
            overflow: "hidden", // Ensure images do not overflow the container
            cursor: "pointer",
          }}
          onClick={modalHandler}
        >
          <img
            src={post.photoUrl}
            alt={`Post ${post._id}`}
            style={{
              width: "100%", // Make the image take full width of its container
              height: "100%", // Make the image take full height of its container
              objectFit: "cover", // Ensure the image covers the entire container
              borderRadius: "8px",
            }}
          />
        </Box>
      </Grid>
    </>
  );
}

export default PostItem;
