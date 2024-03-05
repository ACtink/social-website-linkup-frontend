import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjust height as needed
      }}
    >
      <CircularProgress sx={{ marginTop: "700px" }} color="primary" />
    </Box>
  );
};

export default Loading;
