import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

function ModalThatShowsComments({ listData, listType, isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "#f9f9f9", // Light background color
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: { xs: "100%", sm: "40vw" }, // Adjusted width for small screens
          height: "60vh",
          outline: "none",
          borderRadius: "10px", // Small border radius
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {listType} List
        </Typography>
        {listData && listData.length > 0 ? (
          <List style={{ flex: "1", overflowY: "auto" }}>
            {listData.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "#ffffff", // Light background color for each list item
                  borderRadius: "8px", // Small border radius for each list item
                  marginBottom: "8px", // Spacing between list items
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    paddingRight: "10px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        item.author ? item.author.profilePic : item.profilePic
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.author ? item.author.username : item.username}
                    sx={{ flexGrow: 1, fontSize: "smaller" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    overflowWrap: "break-word",
                  }}
                >
                  <ListItemText
                    primary={item.content ? item.content : "No comment"}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No {listType} to display</Typography>
        )}
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, alignSelf: "flex-end" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalThatShowsComments;
