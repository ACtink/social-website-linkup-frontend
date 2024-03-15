
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Grid, Container, Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        background: "#f0f0f0", // Light gray background
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        {/* Hero section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            marginTop: "70px",
            transition: "transform 0.3s ease-in-out",
            
          }}
        >
          <Typography variant="h3" component="h1" color="primary" gutterBottom>
            Welcome to LinkUp!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The platform for sharing your photos and connecting with others.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
            sx={{ mr: 2 }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/signin"
          >
            Sign In
          </Button>
        </Box>

        {/* Features section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ color: "#333" }}
            >
              Why LinkUp?
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Connect with Others
              </Typography>
              <Typography variant="body2" color="text.secondary">
                LinkUp allows you to connect with friends, family, and new
                people from around the world.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Share Your Photos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share your favorite moments with your followers and explore
                photos from others.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                Interact with Posts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Like, comment, and follow others to stay connected and engaged
                with the community.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
