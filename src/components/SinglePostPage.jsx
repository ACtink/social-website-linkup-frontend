import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SinglePostPage({ post, isOpen, onClose }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Check if screen size is small (xs or sm)

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: "80vw",
          maxHeight: "80vh", // Set a maximum height for the modal
          outline: "none",
          display: "flex",
          flexDirection: "row",
          borderRadius: "5px",
          ...(isSmallScreen && { flexDirection: "column" }), // Change direction to column on small screens
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            maxHeight: "100%", // Ensure the image does not exceed the modal's height
            ...(isSmallScreen && { height: "50vh", margin: "auto" }), // Adjust height and center on small screens
          }}
        >
          <img
            src={post.photoUrl}
            alt="Post"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "100%", // Ensure the image fits within the container
              ...(isSmallScreen && { width: "100%" }), // Adjust width on small screens
            }}
          />
        </Box>
        {!isSmallScreen && (
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
        )}

        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#3f51b5",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "10px 20px",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s, transform 0.3s",
            "&:hover": {
              background: "#303f9f",
              transform: "scale(1.1)",
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
