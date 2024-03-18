import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Make the container fill the entire viewport height
      }}
    >
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
