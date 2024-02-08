import React, { useState } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  console.log(isLoggedIn);

  return (
    <div className="h-20 bg-violet-500  flex justify-between items-center ">
      <div className="ml-6">
        <Link to={"/"}>
          <h1 className="text-white">Twitter App</h1>
        </Link>
      </div>

      <div className="header-buttons space-x-2">
        {!isLoggedIn && (
          <Link to={"/signin"}>
            <button className="text-white">Sign In</button>
          </Link>
        )}
        <Link to={"/allposts"}>
          <button className="text-white">All Posts</button>
        </Link>
        {isLoggedIn && (
          <Link to={"/newpost"}>
            <button className="text-white">New Post</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to={"/profile"}>
            <button className="text-white">Your Profile</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to={"/signout"}>
            <button className="text-white">Sign Out</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to={"/signup"}>
            <button className="text-white">Sign Up</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
