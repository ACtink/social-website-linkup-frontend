



import axios from 'axios'
import React from 'react'


function DeletePost({postId, myPosts, setMyPosts}) {





const deletePost = async ()=>{

    axios.defaults.withCredentials = true;


    try{
     const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`)


     const responseData = response?.data;

     console.log("Response Data:", responseData);

    const postAfterDeletion = myPosts.filter((post)=>{
        return post._id !==postId
    
    })

    console.log(postAfterDeletion)

     setMyPosts(postAfterDeletion)
    
 
    }
    catch(err){
    console.log(err)
    
    }


}




  return (
    <div>



    <button onClick={deletePost}  type="button">Delete</button>



        
    </div>
  )
}

export default DeletePost