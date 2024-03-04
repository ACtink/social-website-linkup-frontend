import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function SignOutButton({ handleSubmit }) {
  const buttonStyle = {
    background: "linear-gradient(to right, #9c27b0, #e91e63)",
    borderRadius: "20px",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    color: "white",
    fontWeight: "bold",
    transition: "background 0.3s",
    "&:hover": {
      background: "linear-gradient(to right, #e91e63, #9c27b0)",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Are you sure you want to sign out?
          </Typography>
          <Typography variant="body1">
            By signing out, you will be logged out of your account and won't be
            able to access your profile until you sign in again.
          </Typography>
        </CardContent>
      </Card>
      <Button variant="contained" style={buttonStyle} onClick={handleSubmit}>
        Sign Out
      </Button>
    </div>
  );
}

export default SignOutButton;
