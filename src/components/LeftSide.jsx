import Box from "@mui/material/Box";

import React from "react";

function LeftSide() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexGrow: 1,
        position: "fixed",
        height: "100%",
        width: "25%",
        background: "linear-gradient(to top, #09203f 0%, #537895 100%)",
        left: 0,
      
      }}
    >
      LeftSide
    </Box>
  );
}

export default LeftSide;
