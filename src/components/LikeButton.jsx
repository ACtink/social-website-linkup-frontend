




import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useDeleteData } from '../utils/useDeleteData';
import { usePostData } from '../utils/usePostData';

const LikeButton = ({ postId }) => {

  
  const [isalreadyLiked , setIsAlreadyLiked] = useState()
 


  const deleteData = useDeleteData()

  const postData = usePostData()




  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike post
     
       
        await deleteData(`/posts/${postId}/like`)



      } else {
        // Like post
        await postData(`/posts/${postId}/like`)

       
      }
      // Toggle like state
      setLiked(prevLiked => !prevLiked);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <IconButton onClick={handleLike} aria-label="like">
      {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default LikeButton;
