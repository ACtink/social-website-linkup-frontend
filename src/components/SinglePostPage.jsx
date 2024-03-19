import React from "react";
import { Box, Button, Modal, Typography, Avatar } from "@mui/material";

function SinglePostPage({ post, isOpen, onClose }) {
  return (
    <Modal
      open={isOpen} // Set to true to display the modal
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose} // Close modal when clicking outside
    >
      <Box
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: "80vw",
          height: "80vh",
          outline: "none",
          display: "flex",
          flexDirection: "row",
          borderRadius: "5px",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <Box
          style={{
            flex: "0 0 70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden", // Ensure images do not overflow the container
          }}
        >
          <img
            src={post.photoUrl}
            alt="Post"
            style={{
              maxWidth: "100%", // Make the image take full width of its container
              maxHeight: "100%", // Make the image take full height of its container
              objectFit: "contain", // Ensure the image is shown completely without being cropped
              verticalAlign: "middle",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: "0 0 30%",
            padding: "0 20px",
          }}
        >
          {/* Caption Title */}
          <Typography variant="subtitle1" sx={{ color: "#757575" }}>
            Caption
          </Typography>
          {/* Post Title */}
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {post.title}
          </Typography>

          {/* Comments and Likes Section */}
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Comments and Likes
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">
              Total Likes: {post.likes}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginTop: 2, fontWeight: "bold" }}
            >
              Comments:
            </Typography>
            <ul
              style={{ paddingLeft: 0, overflow: "auto", maxHeight: "270px" }}
            >
              {post?.comments?.map((comment, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                    backgroundColor: "#f5f5f5",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <Avatar
                    src={comment?.author?.profilePic}
                    sx={{ marginRight: 1 }}
                  />
                  <Typography variant="body1">
                    <strong style={{ color: "#1976D2" }}>
                      {comment?.author.username || comment?.username}
                    </strong>
                    : {comment?.content}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
          {/* End of Comments and Likes Section */}
        </Box>
        <Button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "50px",
            right: "100px",
            background: "#3f51b5", // Button background color
            color: "#fff", // Text color
            border: "none", // No border
            borderRadius: "20px", // Rounded corners
            padding: "10px 20px", // Padding
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)", // Box shadow
            fontWeight: "bold", // Bold text
            cursor: "pointer", // Cursor style
            transition: "background 0.3s, transform 0.3s", // Smooth transition for background and transform
            "&:hover": {
              // Change styles on hover
              background: "#303f9f", // Darker background color
              transform: "scale(1.1)", // Scale button on hover
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default SinglePostPage;
