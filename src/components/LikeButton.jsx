import React, { useState } from "react";
import { IconButton } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { useDeleteData } from "../utils/useDeleteData";
import { usePostData } from "../utils/usePostData";
import MyContext from "../context/ContextProvider";
import { useGetData } from "../utils/useGetData";

const LikeButton = ({ post, setTotalLikes }) => {
  const [userName, setUserName, userId, setUserId] =
    React.useContext(MyContext);
  const getData = useGetData();
  const postId = post._id;
  const isAlreadyLiked = post.likesArray.some((like) => like.author === userId);
  const deleteData = useDeleteData();
  const postData = usePostData();
  const [liked, setLiked] = useState(isAlreadyLiked);

  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike post
        setTotalLikes((prev) => prev - 1);
        await deleteData(`/posts/${postId}/like`);
      } else {
        // Like post
        setTotalLikes((prev) => prev + 1);
        await postData(`/posts/${postId}/like`);
      }
      // Toggle like state
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <IconButton
      onClick={handleLike}
      aria-label="like"
      sx={{
        color: liked ? "#ff1744" : "rgba(0, 0, 0, 0.54)",
        "&:hover": {
          color: liked ? "#d50000" : "#000",
        },
      }}
    >
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default LikeButton;
