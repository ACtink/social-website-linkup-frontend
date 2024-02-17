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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedIn")) || false
  );

  return (
    <div className="App">
      <ResponsiveAppBar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
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
          <Route path="/allposts" element={<AllPosts />} />
          <Route
            path="/newpost"
            element={
              <NewPost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
