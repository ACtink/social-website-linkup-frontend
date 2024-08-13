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
import { Link } from "react-router-dom";

function ModalThatShowsList({ listData, listType, isOpen, onClose }) {
  // Function to handle link click and close the modal
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          width: { xs: "100%", sm: "40vw" },
          height: "60vh",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {listType} List
        </Typography>
        {listData && listData.length > 0 ? (
          <List style={{ flex: "1", overflowY: "auto" }}>
            {listData.map((item, index) => (
              <Link
                key={index}
                to={`/profile/${item.author ? item.author.username : item.username}`}
                onClick={handleLinkClick}
              >
                <ListItem
                  sx={{
                    borderBottom: "1px solid #ccc",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    marginBottom: "8px",
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
                </ListItem>
              </Link>
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

export default ModalThatShowsList;
