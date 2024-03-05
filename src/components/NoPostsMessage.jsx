import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material"; // Import Button and Typography from Material-UI

function NoPostsMessage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">No posts yet!</Typography>
      <Typography variant="body1" style={{ marginBottom: "20px" }}>
        Share your moments and experiences by creating a new post.
      </Typography>
      <Link to="/newpost" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Create New Post
        </Button>
      </Link>
    </div>
  );
}

export default NoPostsMessage;
