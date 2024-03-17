import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NewPost from "./components/NewPost";
import Home from "./components/Home";
import AllPosts from "./components/AllPosts";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import MyContext from "./context/ContextProvider";
import { useSignOut } from "./utils/useSignOut";
import ProfilePage from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";
import { useAxiosForToken } from "./hooks/useAxiosForToken";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedIn")) || false
  );


      const privateAxios = useAxiosForToken();



  const [userName , setUserName]  = useState((localStorage.getItem("userName")) || "Guest")

  const [userId , setUserId] = useState((localStorage.getItem("userId")) || null)

  const [profilePicture , setProfilePicture]  = useState("")

  const signOut = useSignOut(isLoggedIn , setIsLoggedIn)



    const [userProfile, setUserProfile] = React.useState({});


console.log("ye userprofile hai shuru me " , userProfile)





React.useEffect(() => {
  const getUserProfile = async () => {
    try {
      privateAxios.defaults.withCredentials = true;

      const response = await privateAxios.get(`/user/${userName}`);

      if (response.data) {
        setUserProfile(response.data);

        setProfilePicture(response.data.profilePicture)

        console.log("profile aagayi hai bhai fetch hokar")

        console.log(userProfile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  getUserProfile();
}, [userName, profilePicture]);

















  return (
    <div className="App">
      <MyContext.Provider value={[userName, setUserName, userId, setUserId , setUserProfile, setProfilePicture]}>
        <ResponsiveAppBar isLoggedIn={isLoggedIn} userProfile={userProfile} setUserProfile={setUserProfile}  />

        <Routes>
          <Route path={"/"} element={isLoggedIn ? <AllPosts /> : <Home />} />

          <Route
            path="/signin"
            element={
              <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/signout"
            element={
              <SignOut isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/allposts"
            element={isLoggedIn ? <AllPosts /> : <Home />}
          />

          <Route
            path="/newpost"
            element={
              isLoggedIn ? (
                <NewPost
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <Home />
              )
            }
          />

          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <Home />
              )
            }
          />

          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile/:user"
            element={
              <ProfilePage userName={userName} setUserName={setUserName} />
            }
          />
          <Route
            path="/editprofile"
            element={
              <EditProfile userName={userName} setUserName={setUserName} />
            }
          />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
