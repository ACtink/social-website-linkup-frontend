import React from "react";
import { Box, Grid } from "@mui/material";
import SinglePostPage from "./SinglePostPage";
import { Link } from "react-router-dom";

function PostItem({ post, index }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* <SinglePostPage post={post} isOpen={isModalOpen} onClose={modalHandler} /> */}

      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
        <Link to={`/post/${post._id}`}>
          <Box
            style={{
              position: "relative",
              width: "100%", // Full width
              height: "200px", // Fixed height for the container
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              padding: "5px",
              margin: "0 auto", // Padding all around
            }}
            // onClick={modalHandler}
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
        </Link>
      </Grid>
    </>
  );
}

export default PostItem;
