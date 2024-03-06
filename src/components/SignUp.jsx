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
import { useRef } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const postData = usePostData();
  const formRef = useRef(null);
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get("username");

  if (/\s/.test(username)) {
    setError("Username cannot contain spaces.");
    return;
  }

    const data = {
      username: username,
      email: formData.get("email"),
      password: formData.get("password"),
    };

    formRef.current.reset();

    try {
      const response = await postData("/auth/signup", data);

      if (response.data?.message) {
        setError("")
        setSuccessMessage("Successfully Signed Up. Please ");

        // navigate("/signin");
      }
    } catch (err) {
      console.log(err);

      if (err.code === "ERR_NETWORK") {
        setError("Something went wrong on the server, please try again later.");
      } else {
        setError(
          err?.response?.data?.message || "An error occurred during sign up."
        );
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
          Sign up
        </Typography>

        {error && (
          <Typography variant="h6" sx={{ color: "red", marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {successMessage && (
          <Typography variant="h6" sx={{ color: "green", marginTop: 2 }}>
            {successMessage}{" "}
            <Link to={"/signin"}>
              {" "}
              <span style={{ textDecoration: "underline", color: "blue" }}>
                Sign In
              </span>{" "}
            </Link>
          </Typography>
        )}

        <Box
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/signin"} variant="body2">
                Already have an account? <strong>Sign In</strong>
              </Link>
            </Grid>
          </Grid>
          <Button
            component={Link}
            to={"/"}
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              borderColor: "primary.main",
              color: "primary.main",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
