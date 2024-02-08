import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';





function NewPost({isLoggedIn}) {

  const navigate = useNavigate()

  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/login")
    }
  },[isLoggedIn , navigate])

  // const [postBody , setPostBody] = useState("")
  const [newpost , setNewPost] = useState({})
  const [error , setError]  = useState("")


  const onChangePostBody =(e)=>{

    const postBody = e.target.value

    setNewPost({...newpost, postbody :postBody} )

  }

 const createPost = async(e) =>{


  e.preventDefault()

  axios.defaults.withCredentials = true;


        try{

  const response = await axios.post("http://localhost:5000/api/posts/createpost", JSON.stringify(newpost), {
    headers: {
        'Content-Type': 'application/json', 
    },
})

const responseData = response.data;

console.log("Response Data:", responseData);

if (responseData) {
  navigate("/allposts");
}
}
catch(err){
console.log(err)

}


 }

  


  return (
    <div className="register-form-container">
    {error && <h1>{error}</h1>}
      <form action="#" className="register-form" onSubmit={createPost}>
       
        <div>
          <label htmlFor="postbody">New Post</label>
          <input id='postbody' type="text" required onChange={onChangePostBody} />
        </div>

        
        <div><button>Create Post</button></div>
      </form>
    </div>
  )
}

export default NewPost