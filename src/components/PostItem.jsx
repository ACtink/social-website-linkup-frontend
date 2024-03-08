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

      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #ccc",
            borderRadius: "1px",
            padding: "5px",
          }}
        >
          <img
            onClick={modalHandler}
            src={post.photoUrl}
            alt={`Post ${post._id}`}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "contain",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
        </div>
      </Grid>
    </>
  );
}

export default PostItem;
