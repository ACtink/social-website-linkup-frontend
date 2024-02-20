import { Height } from "@mui/icons-material";
import DeletePost from "./DeletePost";
import PostCard from "./PostCard";
import Box from "@mui/material/Box";

function RenderPosts({ posts, setPosts, error }) {
  return (

     <>

      <Box
        sx={{
          display: { md: "flex", sm: "flex" , xs:"flex" },
          width: "100vw",
          
          paddingTop: "100px",
          paddingBottom:"100px",
          flexDirection: "column",

          bgcolor:"white",
     

      
          alignItems:"center",
      

          justifyContent: "center",
        }}
      >


       {error && <h1 style={{marginTop:"100px"}}>{error}</h1> }
 
        {posts &&
          posts.map((post, indx) => {  
             return  <Box key={indx} sx={{ 
              display: { xs: 'block', sm:"flex", md: 'flex' },
              justifyContent: 'center',
              width: { xs: '95%', sm:"90%", md: '50%' },// Set maxWidth to 100% on xs screens
              marginX: 'auto',
              padding:"10px",
              
     
            }}><PostCard key={indx +"post.title"} post={post} /></Box>

          })}
           
   

    </Box>

 </>
  );
}

export default RenderPosts;
