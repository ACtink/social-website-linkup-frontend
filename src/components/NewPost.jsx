// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// function NewPost({isLoggedIn}) {

//   const navigate = useNavigate()

//   useEffect(()=>{
//     if(!isLoggedIn){
//       navigate("/login")
//     }
//   },[isLoggedIn , navigate])

//   // const [postBody , setPostBody] = useState("")
//   const [newpost , setNewPost] = useState({})
//   const [error , setError]  = useState("")

//   const onChangePostBody =(e)=>{

//     const postBody = e.target.value

//     setNewPost({...newpost, postbody :postBody} )

//   }

//  const createPost = async(e) =>{

//   e.preventDefault()

//   axios.defaults.withCredentials = true;

//         try{

//   const response = await axios.post("http://localhost:5000/api/posts/createpost", JSON.stringify(newpost), {
//     headers: {
//         'Content-Type': 'application/json',
//     },
// })

// const responseData = response.data;

// console.log("Response Data:", responseData);

// if (responseData) {
//   navigate("/allposts");
// }
// }
// catch(err){
// console.log(err)

// }

//  }

//   return (
//     <div className="register-form-container">
//     {error && <h1>{error}</h1>}
//       <form action="#" className="register-form" onSubmit={createPost}>

//         <div>
//           <label htmlFor="postbody">New Post</label>
//           <input id='postbody' type="text" required onChange={onChangePostBody} />
//         </div>

//         <div><button>Create Post</button></div>
//       </form>
//     </div>
//   )
// }

// export default NewPost

import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postFormData } from "../utils/PostData";
import { useNavigate } from "react-router-dom";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';


const defaultTheme = createTheme();

export default function NewPost({ isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

  

    const data = {
  
      title: formData.get("title"),
      file: formData.get("file"),

    };






    try {
      const response = await postFormData(
        "http://localhost:5000/api/posts/createpost",
        data
      );

      console.log(response.data.message);

      if (response.data.message) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs" marginTop="10px">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <InsertPhotoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a Post
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
              type="file"
           
                required
                fullWidth
                id="file"
               
                name="file"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="title"
                required
                fullWidth
                id="title"
                label="title"
                autoFocus
              />
            </Grid>

           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Post
          </Button>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
