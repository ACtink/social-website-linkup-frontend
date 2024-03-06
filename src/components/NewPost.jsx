import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useNavigate } from "react-router-dom";
import { usePostFormData } from "../utils/usePostFormData";
import { useSignOut } from "../utils/useSignOut";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

export default function NewPost({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const signOut = useSignOut(isLoggedIn, setIsLoggedIn);
  const postFormData = usePostFormData();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
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
      const response = await postFormData("/posts/createpost", data);

      if (response.data.message) {
        navigate("/profile");
      }
    } catch (err) {
      if (err.response.status === "401") {
        signOut();
      }
      console.log(err);
    }
  };

  return (
    <>
    <LeftSide/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"100px"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <InsertPhotoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  required
                  fullWidth
                  id="file"
                  name="file"
                  variant="outlined"
                  label="Upload Image"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  variant="outlined"
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
      <RightSide/>
    </>
  );
}
