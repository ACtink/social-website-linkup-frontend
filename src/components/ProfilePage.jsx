import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useAxiosForToken } from "../hooks/useAxiosForToken";
import LeftSide from "./LeftSide";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

function ProfilePage({ userName, setUserName }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const privateAxios = useAxiosForToken();

  let { user } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        privateAxios.defaults.withCredentials = true;
        const response = await privateAxios.get(`/user/${user}`);
        setUserProfile(response.data);
        setError("");
      } catch (error) {
        setError("Failed to fetch user profile.");
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
        setError("");
      } catch (error) {
        setError("Failed to fetch user posts.");
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, []);

  return (
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
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
        {userProfile && (
          <Grid
            container
            alignItems="center"
            marginTop="100px"
            justifyContent="center"
          >
            <Grid item xs={6} sm={6} xl={6} container justifyContent="center">
              <img
                src={
                  userProfile.profilePic
                    ? userProfile.profilePic
                    : "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                }
                alt="User Avatar"
                style={{ width: "150px", height: "150px", borderRadius: "50%" , objectFit:"contain" }}
              />
            </Grid>
            <Grid item xs={6} sm={6} xl={6}>
              <Typography variant="h5">{userProfile.username}</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
                Followers: {userProfile.followers}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
                Following: {userProfile.following}
              </Typography>
              <Link to="/editprofile" underline="none">
                <Button variant="outlined" sx={{ marginTop: "10px" }}>
                  Edit Profile
                </Button>
              </Link>
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
            padding: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Posts
          </Typography>

          {loading && <Loading marginValue={170} />}

          <Grid container spacing={3} paddingBottom="30px">
            {userPosts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #ccc",
                    borderRadius: "1px",
                    padding: "5px",
                  }}
                >
                  <img
                    src={post.photoUrl}
                    alt={`Post ${post._id}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
