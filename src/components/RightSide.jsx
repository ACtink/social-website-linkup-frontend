import Box from "@mui/material/Box";

import React from "react";

function RightSide() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexGrow: 1,
        position: "fixed",
        top:"0",
        right:"0",
        height: "100%",
        width: "25%",
       
        border:"4px",
  
  

        
        
      }}
    >


<Box sx={{color:"white"}}>

        <div style={{marginTop:"200px"}}>
        <h1 style={{color:"orange"}}>this is in the left of the screen</h1>

        <a href="/signout">signout</a>


        </div>

      </Box>

      

    </Box>
  );
}

export default RightSide;
