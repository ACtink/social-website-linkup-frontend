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

function ModalThatShowsList({ listData, isOpen, onClose, listType }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {listType === "followers" ? "Followers" : "Following"} List
        </Typography>
        <List style={{ flex: "1", overflowY: "auto" }}>
          {listData.map((item, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
              <ListItemAvatar>
                <Avatar src={item.profilePic} />
              </ListItemAvatar>
              <ListItemText primary={item.username} />
            </ListItem>
          ))}
        </List>
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
