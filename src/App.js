import "./App.css";
import { useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedIn")) || false
  );


  const [userName , setUserName]  = useState((localStorage.getItem("userName")) || "Guest")

  const [userId , setUserId] = useState((localStorage.getItem("userId")) || null)

  const signOut = useSignOut(isLoggedIn , setIsLoggedIn)

  if(!isLoggedIn){
    signOut()
  }


  return (
    <div className="App">
      <MyContext.Provider value={[userName, setUserName, userId, setUserId]}>
        <ResponsiveAppBar isLoggedIn={isLoggedIn} />

        <Routes>
      <Route path={"/"} element={isLoggedIn ? <AllPosts /> :<Home/>} />

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
       <Route path="/allposts" element={ isLoggedIn ? <AllPosts /> :<Home/>} />


          <Route
            path="/newpost"
            element={
            isLoggedIn ?  <NewPost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> :<Home/>
            }
          />


         <Route
            path="/profile"
            element={
              
              isLoggedIn ? <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Home/>}/>


          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
