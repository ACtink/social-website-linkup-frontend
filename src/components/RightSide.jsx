import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListItemAvatar } from "@mui/material";


function RightSide() {
  // Dummy data for people to follow
  const [peopleToFollow, setPeopleToFollow] = useState([]);

  // Dummy data for posts to check out
  const [postsToCheckOut, setPostsToCheckOut] = useState([]);



  useEffect(()=>{

   const fetchPeopleToFollow = async ()=>{


    try{


            const response = await axios.get(`/user/user-to-follow?limit=3`);


            if(response.data){
              setPeopleToFollow(response.data)
            }

   }catch(err){
    console.log("dekho dekho error aya hai ", err)

   }

    }

    fetchPeopleToFollow()

  },[])


  
  useEffect(() => {
    const fetchPostsToCheckOut = async () => {
      try {
        const response = await axios.get(`/posts/posts-to-check-out?limit=3`);

        if (response.data) {
          setPostsToCheckOut(response.data);
        }
      } catch (err) {
        console.log("dekho dekho error aya hai ", err);
      }
    };

    fetchPostsToCheckOut();
  }, []);










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
      <div style={{ marginBottom: "20px", marginTop: "70px" }}>
        <h2
          style={{
            margin: "0 0 10px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            letterSpacing: "1px",
          }}
        >
          People to Follow
        </h2>
        <List>
          {peopleToFollow.map((person) => (
            <Link
              to={`/profile/${person.username}`}
              key={person._id}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                sx={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  transition: "background-color 0.3s",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={person.profilePic} />
                </ListItemAvatar>
                <ListItemText
                  primary={person.username}
                  secondary={person.username}
                  sx={{ marginLeft: "10px" }}
                />
              </ListItem>
            </Link>
          ))}
        </List>

        <div>
          <h2
            style={{
              margin: "30px 0 10px",
              color: "#333",
              fontWeight: "bold",
              fontSize: "18px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              letterSpacing: "1px",
            }}
          >
            Posts to Check Out
          </h2>
          <List>
            {postsToCheckOut.map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  button
                  sx={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#fff",
                    transition: "background-color 0.3s",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={post.photoUrl} />
                  </ListItemAvatar>{" "}
                  <ListItemText
                    primary={post.title}
                    secondary={`By ${post.username}, ${post.likes} likes`}
                    sx={{ marginLeft: "10px" }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </div>
    </Box>
  );
}

export default RightSide;
