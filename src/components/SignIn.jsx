import * as React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { usePostData } from "../utils/usePostData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyContext from "../context/ContextProvider";

export default function SignIn({ isLoggedIn, setIsLoggedIn }) {
  const [error, setError] = useState("");
  const [userName, setUserName, userId, setUserId] =
    React.useContext(MyContext);
  const navigate = useNavigate();
  const postData = usePostData();

  console.log("username before signin" , userName)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await postData("/auth/signin", data);

      if (response?.data) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");

        console.log(response.data.userName);
       await setUserName(response.data.userName);
          console.log("username after signin", userName);

        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);

        setUserId(response.data.userId);

        navigate("/profile");
      }
    } catch (err) {

   console.log(err);

      if (err.code === "ERR_NETWORK"){

        setError("Something went Wrong on the server, please try after some time")

      } 

      else{
         setError(err?.response?.data?.message);

      }     
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "110px" }}>
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

        {error && (
          <Typography variant="h6" sx={{ color: "red", marginTop: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={() => {
                  setError("");
                }}
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
                onChange={() => {
                  setError("");
                }}
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
                Don't have an Account? <strong>Sign Up</strong>
              </Link>
            </Grid>
          </Grid>
          <Button
            component={Link}
            to={"/"}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, borderColor: "primary.main", color: "primary.main" }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
