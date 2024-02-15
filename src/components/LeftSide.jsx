import Box from "@mui/material/Box";

import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Link } from "react-router-dom";


function LeftSide() {
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
        <List sx={{display:{md:"flex"} , flexDirection:"column" , gap:"30px", width: "60%", maxWidth: 390, height:"80%" }}>
         <Link to={"/allposts"}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="All Posts"  />
          </ListItem>
          </Link>
          <Link to={"/profile"}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Profile"  />
          </ListItem>
          </Link>
          <Link to={"/newpost"}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create a new Post"  />
          </ListItem>
          </Link>
        </List>
      </Box>
    </Box>
  );
}

export default LeftSide;
