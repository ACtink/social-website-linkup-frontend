import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useState } from "react";

function RightSide() {
  // Dummy data for people to follow
  const [peopleToFollow, setPeopleToFollow] = useState([
    { id: 1, name: "John Doe", username: "@john_doe" },
    { id: 2, name: "Jane Smith", username: "@jane_smith" },
    { id: 3, name: "Alice Johnson", username: "@alice_johnson" },
  ]);

  // Dummy data for posts to check out
  const [postsToCheckOut, setPostsToCheckOut] = useState([
    {
      id: 1,
      title: "Amazing Sunset",
      author: "John Doe",
      likes: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Beautiful Landscape",
      author: "Jane Smith",
      likes: 150,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Adventures in the Mountains",
      author: "Alice Johnson",
      likes: 120,
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        flexGrow: 1,
        position: "fixed",
        top: "0",
        right: "0",
        height: "100%",
        width: "25%",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        overflow: "auto",
      }}
    >
      <div style={{ marginBottom: "20px", marginTop:"70px" }}>
        <h2
          style={{
            margin: "0 0 10px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          People to Follow
        </h2>
        <List>
          {peopleToFollow.map((person) => (
            <Link
              to={`/profile/${person.username}`}
              key={person.id}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                button
                sx={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s",
                }}
              >
                <Avatar />
                <ListItemText
                  primary={person.name}
                  secondary={person.username}
                  sx={{ marginLeft: "10px" }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
      <div>
        <h2
          style={{
            margin: "0 0 10px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Posts to Check Out
        </h2>
        <List>
          {postsToCheckOut.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                button
                sx={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s",
                }}
              >
                <Avatar alt={post.title} src={post.image} />
                <ListItemText
                  primary={post.title}
                  secondary={`By ${post.author}, ${post.likes} likes`}
                  sx={{ marginLeft: "10px" }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Box>
  );
}

export default RightSide;
