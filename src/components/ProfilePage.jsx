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
  const [showFollowers , setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false);

    const [youAreAFollower , setYouAreAfollower] = useState(false)
        // const [isFollowing, setIsFollowing] = useState(false);


  const privateAxios = useAxiosForToken();

  let { user } = useParams();
  const loggedInUser = localStorage.getItem("userName");

  const [noPostMessage, setNoPostMessage] = useState("");


  const postData = usePostData();


   const [isModalOpen, setIsModalOpen] = React.useState(false);

   const modalHandler = () => {
     setIsModalOpen(!isModalOpen);
   };



  const handleFollow = async () => {
    // Logic to handle the follow action


    try{

    

     const response =  await postData(`/user/${userProfile.username}/follow`);


     if(response?.data){
      console.log("User followed");
      setYouAreAfollower(!youAreAFollower)

      await fetchUserProfile()

     }

     }catch(err){
      console.log(err)
     }


  };

    const handleUnFollow = async () => {
      // Logic to handle the follow action

      try {
        const response = await postData(`/user/${userProfile.username}/unfollow`);

        if (response?.data) {
          console.log("User unfollowed");

                setYouAreAfollower(!youAreAFollower);


             await fetchUserProfile();
        }
      } catch (err) {
        console.log(err);
      }
    };




  const fetchUserProfile = async () => {
    try {
      privateAxios.defaults.withCredentials = true;
      const response = await privateAxios.get(`/user/${user}`);

      setUserProfile(response.data);
      console.log(response.data);
      setError("");

      if (
        response.data.followers.find(
          (person) => person.username === loggedInUser
        )
      ) {
        setYouAreAfollower(true);
        console.log(youAreAFollower);
      }

      //  if (response.data.following.find((person) => person.username === loggedInUser)) {
      //    setIsFollowing(true);
      //             console.log(isFollowing);

      //  }

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
      console.log(error);
      setError("Failed to fetch user posts.");
    }
  };

  








  useEffect(() => {

   const fetchUserProfileAndPosts = async()=>{
   const result = await fetchUserProfile()

   if (result) {
   await fetchUserPosts();
  }


    }
    fetchUserProfileAndPosts()

    
    
  }, [user]);

  return (
    <>
      {showFollowers && (
        <ModalThatShowsList
          listData={userProfile.followers}
          listType={"followers"}
          isOpen={isModalOpen}
          onClose={modalHandler}
        />
      )}
      {showFollowing && (
        <ModalThatShowsList
          listData={userProfile.following}
          listType={"following"}
          isOpen={isModalOpen}
          onClose={modalHandler}
        />
      )}
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
                      objectFit: "cover",

                      // Ensure the image takes up the full height of the container
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} xl={6}>
                <Typography variant="h5">{userProfile.username}</Typography>
                <Typography
                  variant="subtitle1"
                  onClick={() => {
                    setShowFollowers(true);
                    modalHandler();
                  }}
                  sx={{ marginBottom: "5px", cursor: "pointer" }}
                >
                  {/* <Link to={`/profile/${userProfile.username}/followers`}>
                    {" "} */}
                  Followers: {userProfile.followers.length} {/* </Link> */}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: "20px", cursor: "pointer" }}
                  onClick={() => {
                    setShowFollowing(true);
                    modalHandler();
                  }}
                >
                  Following: {userProfile.following.length}
                </Typography>
                {/* Follow Button */}
                {loggedInUser !== user &&
                  !youAreAFollower &&(
                    <Button variant="contained" onClick={handleFollow}>
                      Follow
                    </Button>
                  )}
                {loggedInUser !== user &&
                  youAreAFollower && ( 
                    <Button variant="contained" onClick={handleUnFollow}>
                      Unfollow
                    </Button>
                  )}
                {/* Edit Profile Button */}
                {loggedInUser === user &&  (
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
                  <PostItem key={index} post={post} index={index} />
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
