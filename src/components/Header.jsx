import React, { useState } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  console.log(isLoggedIn);

  return (
    <div className="h-20 bg-violet-500 mb-10 flex justify-between items-center ">
      <div className="ml-6">
        <Link to={"/"}>
          <h1 className="text-white">Twitter App</h1>
        </Link>
      </div>

      <div className="header-buttons space-x-2">
        {!isLoggedIn && (
          <Link to={"/register"}>
            <button className="text-white">Register</button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to={"/login"}>
            <button className="text-white">Login</button>
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
          <Link to={"/logout"}>
            <button className="text-white">Logout</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
