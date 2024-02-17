import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useEffect, useState } from "react";
import MiddleSection from "./MiddleSection";
import { Box } from "@mui/material";
import { useAxiosForToken } from "../hooks/useAxiosForToken";
import { useSignOut } from "../utils/useSignOut";

function Profile({ isLoggedIn , setIsLoggedIn }) {
  const [userPosts, setUserPosts] = useState(null);
  const [error, setError] = useState("");
  const signOut = useSignOut(isLoggedIn , setIsLoggedIn)


  const privateAxios = useAxiosForToken();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {

        privateAxios.defaults.withCredentials = true;



        const response = await privateAxios.get("/posts/myposts");

        if (response?.data) {
          console.log(response.data);
          setUserPosts(response.data);
          setError("");
        }
      } catch (err) {
        if (err.response?.data) {
          console.log("in catch ");

           signOut()
          

          setError(err.response?.data.message);
        } else {
          setError("Server is Down , Can't fetch Your Posts now");
        }
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "flex" },
        alignItems: "center",
        flexDirection: "coloumn",
        justifyContent: "center",
      }}
    >

      {console.log(error)}
      <h1> {error && error}</h1>

      <LeftSide />

      {userPosts && (
        <MiddleSection
          posts={userPosts}
          setPosts={setUserPosts}
          error={error}
        />
      )}

      <RightSide />
    </Box>
  );
}

export default Profile;
