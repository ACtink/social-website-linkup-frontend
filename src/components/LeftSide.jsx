import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useLocation } from "react-router-dom";

function LeftSide() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(""); // State to keep track of selected item

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/allposts":
        setSelectedItem("allposts");
        break;
      case "/profile":
        setSelectedItem("profile");
        break;
      case "/newpost":
        setSelectedItem("newpost");
        break;
      case "/signout":
        setSelectedItem("signout");
        break;
      default:
        setSelectedItem("");
    }
  }, [location]);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexGrow: 1,
        position: "fixed",
        top: "0",
        left: "0",
        height: "100%",
        width: "25%",
        zIndex: "5",
      }}
    >
      <Box
        sx={{
          display: { md: "flex" },
          width: "100%",
          height: "80%",
          marginTop: "100px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            display: { md: "flex" },
            flexDirection: "column",
            gap: "30px",
            width: "60%",
            maxWidth: 390,
            height: "80%",
          }}
        >
          <Link to={"/allposts"} style={{ textDecoration: "none" }}>
            <ListItem
              button
              sx={{
                "&:hover": {
                  backgroundColor: selectedItem !== "allposts" && "#f0f0f0",
                  borderRadius: "10px",
                },
                borderRadius: "10px",
                backgroundColor:
                  selectedItem === "allposts" ? "#f0f0f0" : "transparent",
              }}
              onClick={() => setSelectedItem("allposts")}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#1976d2" }}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="All Posts"
                sx={{ fontFamily: "Arial", fontWeight: 600 }}
              />
            </ListItem>
          </Link>
          <Link to={"/profile"} style={{ textDecoration: "none" }}>
            <ListItem
              button
              sx={{
                "&:hover": {
                  backgroundColor: selectedItem !== "profile" && "#f0f0f0",
                  borderRadius: "10px",
                },
                borderRadius: "10px",
                backgroundColor:
                  selectedItem === "profile" ? "#f0f0f0" : "transparent",
              }}
              onClick={() => setSelectedItem("profile")}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#4caf50" }}>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Profile"
                sx={{ fontFamily: "Arial", fontWeight: 600 }}
              />
            </ListItem>
          </Link>
          <Link to={"/newpost"} style={{ textDecoration: "none" }}>
            <ListItem
              button
              sx={{
                "&:hover": {
                  backgroundColor: selectedItem !== "newpost" && "#f0f0f0",
                  borderRadius: "10px",
                },
                borderRadius: "10px",
                backgroundColor:
                  selectedItem === "newpost" ? "#f0f0f0" : "transparent",
              }}
              onClick={() => setSelectedItem("newpost")}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#ff9800" }}>
                  <AddCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Create a new Post"
                sx={{ fontFamily: "Arial", fontWeight: 600 }}
              />
            </ListItem>
          </Link>
          <Link to={"/signout"} style={{ textDecoration: "none" }}>
            <ListItem
              button
              sx={{
                "&:hover": {
                  backgroundColor: selectedItem !== "signout" && "#f0f0f0",
                  borderRadius: "10px",
                },
                borderRadius: "10px",
                backgroundColor:
                  selectedItem === "signout" ? "#f0f0f0" : "transparent",
              }}
              onClick={() => setSelectedItem("signout")}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: "#f44336" }}>
                  <ExitToAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Sign Out"
                sx={{ fontFamily: "Arial", fontWeight: 600 }}
              />
            </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  );
}

export default LeftSide;
