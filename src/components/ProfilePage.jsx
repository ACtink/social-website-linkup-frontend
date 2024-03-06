import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useAxiosForToken } from "../hooks/useAxiosForToken";
import LeftSide from "./LeftSide";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import PostItem from "./PostItem";

function ProfilePage({ userName, setUserName }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const privateAxios = useAxiosForToken();

  let { user } = useParams();
  const loggedInUser = localStorage.getItem("userName");

  const [noPostMessage, setNoPostMessage] = useState("");

  useEffect(() => {
    async function fetchProfileAndPosts() {
      const fetchUserProfile = async () => {
        try {
          privateAxios.defaults.withCredentials = true;
          const response = await privateAxios.get(`/user/${user}`);
          setUserProfile(response.data);
          setError("");
          return true;
        } catch (error) {
          setError("Failed to fetch user profile.");
          return false;
        }
      };

      const fetchUserPosts = async () => {
        try {
          setLoading(true);
          privateAxios.defaults.withCredentials = true;
          const response = await privateAxios.get(`/posts/${user}`);
          await new Promise((res) => setTimeout(res, 2000));
          setLoading(false);
          setUserPosts(response.data);
          if (response.data.length === 0) {
            setNoPostMessage("No Posts yet.");
          }
          setError("");
        } catch (error) {
          setError("Failed to fetch user posts.");
        }
      };

      const result = await fetchUserProfile();
      if (result) {
        fetchUserPosts();
      }
    }

    fetchProfileAndPosts();
  }, []);

  return (
    <>
      <Box sx={{ padding: "20px", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            right: "0",

            maxWidth: { xs: "100%", sm: "100%", md: "76%" },
            minWidth: { xs: "100%", sm: "100%", md: "76%" },
          }}
        >
          {error && (
            <Typography variant="h6" marginTop="100px" color="error">
              {error}
            </Typography>
          )}
          {userProfile && (
            <Grid
              container
              alignItems="center"
              marginTop="100px"
              justifyContent="center"
              minHeight="200px"
              minWidth="200px"
            >
              <Grid item xs={6} sm={6} xl={6} container justifyContent="center">
                <Box
                  sx={{
                    width: "150px",
                    height: "150px",
                    bgcolor: "#908C99",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={
                      userProfile.profilePic
                        ? userProfile.profilePic
                        : "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                    }
                    alt="User Avatar"
                    style={{
                      width: "150px", // Ensure the image takes up the full width of the container
                      height: "150px",
                      borderRadius: "50%",

                      // Ensure the image takes up the full height of the container
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} xl={6}>
                <Typography variant="h5">{userProfile.username}</Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
                  Followers: {userProfile.followers}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
                  Following: {userProfile.following}
                </Typography>
                {loggedInUser === user && (
                  <Link to="/editprofile" underline="none">
                    <Button variant="outlined" sx={{ marginTop: "10px" }}>
                      Edit Profile
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          )}

          <LeftSide userName={userName} />

          <Box
            sx={{
              // maxWidth: { xs: "100%", sm: "90%", md: "76%" },
              // minWidth: { xs: "100%", sm: "90%", md: "76%" },
              // position: "absolute",
              // right: "0px",
              marginTop: "50px",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                height: "0.062rem",
                width: "100%",
                bgcolor: "#828790",
                marginBottom: "10px",
              }}
            ></Box>

            {/* <Typography
            variant="h4"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Posts
          </Typography> */}

            {loading && <Loading marginValue={170} />}

            {userPosts.length > 0 && (
              <Grid container spacing={3} paddingBottom="50px">
                {userPosts.map((post, index) => (
                  <PostItem post={post} index={index} />
                ))}
              </Grid>
            )}

            {!userPosts.length > 0 && !loading && (
              <Grid container spacing={3} paddingBottom="50px">
                <Box
                  sx={{ marginTop: "30px", textAlign: "center", width: "100%" }}
                >
                  <Typography variant="h5" fontWeight="bold" align="center">
                    {noPostMessage}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage;
