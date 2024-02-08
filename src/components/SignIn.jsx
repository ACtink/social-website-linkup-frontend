import * as React from "react";
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
import { postData } from "../utils/PostData";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";



const defaultTheme = createTheme();

export default function SignIn({isLoggedIn, setIsLoggedIn}) {

    const [error, setError]  = useState("")

    const navigate = useNavigate()
















   const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const data = {
      
      email: formData.get("email"),
      password: formData.get("password"),
    }


    try{

    const response = await postData("http://localhost:5000/api/auth/signin", data )



    console.log(response)

    if (response?.data) {
     
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true")
        navigate("/allposts")
      } 
    } catch (err) {
        setError(err.response.data.error)
      console.error('Error during fetch:', err.response.data.error);
    }

  
   
  }




 

  return (
    // <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >

            <h1>{error && error}</h1>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/signup"} variant="body2">
                  Don't have an Account ? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    // </ThemeProvider>
  );
}
