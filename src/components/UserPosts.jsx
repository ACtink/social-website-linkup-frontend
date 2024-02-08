import React from "react";
import RenderPosts from "./RenderPosts";

function UserPosts() {
  return (
    <div className=" max-w-96 h-96 rounded-2xl mx-auto bg-red-800 ">
      <h1 className="bg-white p-5 text-2xl rounded-tl-2xl rounded-tr-2xl text-gray-500">
        My Posts
      </h1>
      <RenderPosts />
    </div>
  );
}

export default UserPosts;
