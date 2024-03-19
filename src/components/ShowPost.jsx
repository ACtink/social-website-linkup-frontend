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

  return (
    <>
      {loading && <Loading marginValue={300} />}
      {post && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "flex-start",
            paddingTop: { xs: "18%", sm: "10%", md: "5%", xl: "5%" },
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 70%" },
              paddingRight: { xs: 0, sm: "20px" },
              overflow: "hidden",
            }}
          >
            <img
              src={post.photoUrl}
              alt={`Post ${post._id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 100%" },
              padding: { xs: "5px", sm: "20px" },
              boxShadow: { xs: "none", sm: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
              maxHeight: { xs: "40vh", sm: "50vh", md:"85vh" },
              overflowY: "scroll",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Comments and Likes
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Likes: {post.likes}
            </Typography>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
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
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ShowPost;
