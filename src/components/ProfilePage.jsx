import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useAxiosForToken } from "../hooks/useAxiosForToken";
import LeftSide from "./LeftSide";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import PostItem from "./PostItem";
import { usePostData } from "../utils/usePostData";
import ModalThatShowsList from "./ModalThatShowsList";

function ProfilePage({ userName, setUserName }) {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null); // State to manage modal type
  const [youAreAFollower, setYouAreAFollower] = useState(false);
  const privateAxios = useAxiosForToken();
  const { user } = useParams();
  const loggedInUser = localStorage.getItem("userName");
  const [noPostMessage, setNoPostMessage] = useState("");
  const postData = usePostData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalHandler = (type) => {
    setModalType(type);
    setIsModalOpen(!isModalOpen);
  };

  const handleFollowToggle = async () => {
    try {
      const response = await postData(
        `/user/${userProfile.username}/${
          youAreAFollower ? "unfollow" : "follow"
        }`
      );
      if (response?.data) {
        console.log(youAreAFollower ? "User unfollowed" : "User followed");
        setYouAreAFollower(!youAreAFollower);
        fetchUserProfile(); // Fetch user profile and posts after updating follow status
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setUserProfile(null); // Reset user profile to null while fetching new data
      setUserPosts([]); // Reset user posts to an empty array while fetching new data

      privateAxios.defaults.withCredentials = true;
      const response = await privateAxios.get(`/user/${user}`);
      await new Promise((res) => setTimeout(res, 600));
      setLoading(false);
      setUserProfile(response.data);
      setError("");
      if (
        response.data.followers.find(
          (person) => person.username === loggedInUser
        )
      ) {
        setYouAreAFollower(true);
      }

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
      await new Promise((res) => setTimeout(res, 600));
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

  useEffect(() => {
    async function fetchProfileData() {
       fetchUserProfile();
      // if (result) {
      //   await fetchUserPosts();
      // }
    }
    fetchProfileData();
  }, [user, youAreAFollower]);

  useEffect(() => {
    async function fetchPostsData() {
       fetchUserPosts();
      // if (result) {
      //   await fetchUserPosts();
      // }
    }
    fetchPostsData();
  }, [user]);









  return (
    <Box>
      <ModalThatShowsList
        listData={
          modalType === "followers"
            ? userProfile?.followers
            : userProfile?.following
        }
        listType={modalType}
        isOpen={isModalOpen}
        onClose={modalHandler}
      />
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
          {loading && <Loading marginValue={170} />}
          {!loading && userProfile && (
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
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} xl={6}>
                <Typography variant="h6">{userProfile.username}</Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
                  Posts: {userPosts?.length}
                </Typography>

                <Typography
                  variant="subtitle1"
                  onClick={() => modalHandler("followers")}
                  sx={{ marginBottom: "5px", cursor: "pointer" }}
                >
                  Followers: {userProfile.followers.length}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "20px", cursor: "pointer" }}
                  onClick={() => modalHandler("following")}
                >
                  Following: {userProfile.following.length}
                </Typography>
                {/* Follow/Unfollow Button */}
                {loggedInUser !== user && (
                  <Button variant="contained" onClick={handleFollowToggle}>
                    {youAreAFollower ? "Unfollow" : "Follow"}
                  </Button>
                )}
                {/* Edit Profile Button */}
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
              marginTop: "50px",
              padding: "10px",
            }}
          >
            {!loading && userProfile && (
              <Box
                sx={{
                  height: "0.062rem",
                  width: "100%",
                  bgcolor: "#828790",
                  marginBottom: "2rem",
                }}
              ></Box>
            )}

            {loading && <Loading marginValue={400} />}

            {!loading && userPosts && userPosts.length > 0 && (
              <Grid container spacing={3} paddingBottom="50px">
                {userPosts.map((post, index) => (
                  <PostItem key={index} post={post} index={index} />
                ))}
              </Grid>
            )}

            {!loading && !userPosts.length > 0 && (
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
    </Box>
  );
}

export default ProfilePage;
