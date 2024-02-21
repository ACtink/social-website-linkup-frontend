




import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useDeleteData } from '../utils/useDeleteData';
import { usePostData } from '../utils/usePostData';
import MyContext from '../context/ContextProvider';
import { useGetData } from '../utils/useGetData';

const LikeButton = ({ post , setTotalLikes }) => {

  const [ userName, setUserName , userId, setUserId ] = React.useContext(MyContext);


  const getData = useGetData()


  const postId = post._id
  


     const isAlreadyLiked =  post.likesArray.some(like => like.author === userId);

    

 
 


  const deleteData = useDeleteData()

  const postData = usePostData()




  const [liked, setLiked] = useState(isAlreadyLiked);

  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike post
     
       
        await deleteData(`/posts/${postId}/like`)



      } else {
        // Like post
        await postData(`/posts/${postId}/like`)

       
      }



      const response =  await getData(`/posts/${postId}/likesCount`)

if(response?.data){

  setTotalLikes(response.data.totalLikes)


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
      {/* { isAlreadyLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />} */}

    </IconButton>
  );
};

export default LikeButton;
