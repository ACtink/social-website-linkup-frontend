import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAxiosForToken } from "../hooks/useAxiosForToken";
import Loading from "./Loading";

function ShowPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const privateAxios = useAxiosForToken();

  const loggedInUser = localStorage.getItem("userName");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        privateAxios.defaults.withCredentials = true;
        const response = await privateAxios.get(`/posts/id/${id}`);
        if (response?.data) {
          await new Promise((res) => setTimeout(res, 1000));
          console.log(response.data);
          setPost(response.data);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        if (err.response?.data) {
          console.log("calling singout now ");
          setError(err.response?.data.message);
        } else {
          setError("Server is Down, Can't fetch Your Posts now");
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {

        const isConfirmed = window.confirm(
          "Are you sure you want to delete this post?"
        );


        if(isConfirmed){
                console.log("Deleting post...");

            privateAxios.defaults.withCredentials = true;

          const response = await privateAxios.delete(`/posts/${id}`);

            if (response.data) {
              navigate(-1);
            } else {
              setError("Error while deleting post , sorry :(");
            }

        }
        else{

                console.log("Post deletion canceled.");


        }
  


   
  };

  return (
    <>
      {loading && <Loading marginValue={300} />}
      {post && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            // alignItems: "flex-start",
            justifyContent: "space-between",
            paddingTop: { xs: "18%", sm: "10%", md: "5%", xl: "5%" },
            maxHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "black",
              alignItems: "center",

              minWidth: { xs: " 100vw", md: " 70vw" },
              // maxHeight: { xs: " 40vh", md: " 70vw" },

              // paddingRight: { xs: 0, sm: "20px" },
              overflow: "hidden",
            }}
          >
            <img
              src={post.photoUrl}
              alt={`Post ${post._id}`}
              style={{
                width: "auto",
                height: "auto",
                maxheight: "100%",
                maxwidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 100%" },
              padding: { xs: "5px", sm: "20px" },
              boxShadow: { xs: "none", sm: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
              maxHeight: { xs: "40vh", sm: "50vh", md: "85vh" },
              minWidth: { xs: "100vw", sm: "100vw", md: "30vw" },
              maxWidth: { xs: "100vw", sm: "100vw", md: "30vw" },
              overflowY: "scroll",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontWeight: "bold",
                color: "#1976D2",
                marginTop: 1,
                textDecoration: "underline",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              By {post.author?.username}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#616161", // Faded color
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Thin font
                fontWeight: 300, // Thin font weight
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Dark shadow
                marginBottom: 1, // Add some space below the caption
              }}
            >
              Caption
            </Typography>
            {/* Post Title */}
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                color: "#212121",
                fontWeight: 600,
                fontSize: "1.1rem",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // You can keep the same font as the caption or change it
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Add a thicker shadow to the post title
                textDecoration: "underline", // Add underline to the post title
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#212121", fontFamily: "Arial, sans-serif" }}
            >
              Comments and Likes
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "#616161", fontFamily: "Arial, sans-serif" }}
            >
              Total Likes: {post.likes}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight="bold"
              sx={{ color: "#212121", fontFamily: "Arial, sans-serif" }}
            >
              Comments:
            </Typography>
            <ul
              style={{
                listStyleType: "none",

                padding: 0,
              }}
            >
              {post?.comments?.map((comment, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    backgroundColor: "#f5f5f5",
                    padding: "8px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
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
                  </Box>
                </li>
              ))}
            </ul>
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: "20px",
                  alignSelf: "flex-end", // Align the button to the end of the flex container
                  marginLeft: "auto", // Push the button to the end of the container
                }}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
            </Box>
            {post.author?.username === loggedInUser && (
              <Box>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    marginTop: "20px",
                    alignSelf: "flex-end", // Align the button to the end of the flex container
                    marginLeft: "auto", // Push the button to the end of the container
                  }}
                  onClick={handleDelete}
                >
                  Delete Post
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default ShowPost;
