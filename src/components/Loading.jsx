import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = ({marginValue}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh", // Adjust height as needed
      }}
    >
      <CircularProgress sx={{ marginTop: `${marginValue}px` }} color="primary" />
    </Box>
  );
};

export default Loading;
