import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatTimeStamp } from "../utils/formatTimeStamp";
import { Button, TextField, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { usePostData } from "../utils/usePostData";
import LikeButton from "./LikeButton";


export default function PostCard({ post }) {

  // console.log(post)



  const [loading, setLoading] = React.useState(false);


  const [totalLikes, setTotalLikes] = React.useState(post.likes);




  const postData = usePostData()


  const [showMore, setShowMore] = React.useState(false);
  const isTruncated = post.title.length > 20; // Adjust 20 based on your desired line count

  const handleShowMore = () => {
    setShowMore(!showMore);
  };






  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      comment: formData.get("comment"),
      postId: post._id
      
    
    };

    setLoading(true)

    console.log(data)

    try {
      const response = await postData(
        `/posts/${post._id}/comment`,
        data
      );

      console.log(response.data.message);

      if (response.data.message) {
        setLoading(false)
    
      }
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
   };



















  
   





   

























  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", sm: "90%", md: "70%" },

        height: { xs: "30%", sm: "30%", md: "30%" },
        maxHeight: { md: "50%" },
        // height: "40%",
        padding: "5px",
        marginBottom: "20px",
        // marginLeft: "10px",
        // marginRight: "10px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.title.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.username}
        subheader={formatTimeStamp(post.timestamp)}
      />
      <CardMedia
        component="img"
        image={post.photoUrl}
        alt="Tree in snow"
        sx={{
          width: "100%",
          maxHeight: {md:"30rem",xs:"32rem"}, // Ensure image takes full height of CardMedia
          objectFit: {md:"contain", sm:"cover", xs:"cover"},
          padding:"1rem", // Maintain aspect ratio and fill the container
        }}
      />

     
      <CardActions disableSpacing>
      

        <LikeButton post={post} setTotalLikes={setTotalLikes}   />



        <Typography variant="body2">
           <span> {totalLikes} Likes</span> 
          </Typography>
       
      </CardActions>
     
      <CardContent style={{ display: 'flex' , alignItems: 'start', gap:"15px" }}>    
        <Typography variant="body1" sx={{ color: 'text.primary', minWidth:"15%", flexBasis:"0" }}>
          {post.username}--
        </Typography>
       

        <Typography variant="body2" color="text.secondary">
      {isTruncated && !showMore && (
        <span>{post.title.slice(0, 20)}...</span>
      )}
      {isTruncated && showMore && <Box sx={{maxWidth:"65vw", wordWrap:"break-word" }}>{post.title}</Box>}
      {!isTruncated && <span>{post.title}</span>}
      {isTruncated && !showMore && <Button onClick={handleShowMore}>Show more</Button>}
      
      {showMore && <Button onClick={handleShowMore}>Show less</Button>}
    </Typography>

       </CardContent>



       <CardContent style={{ display: 'flex', flexDirection:"column", gap:"15px" }}>    
       
       
       <Box component="form" noValidate onSubmit={handleSubmit} >
                <Box sx={{ display: 'flex', flexDirection:"column", minWidth:"100%"}}>
                        <TextField

                          fullWidth
                          name="comment"
                          id="standard-search"
                          label="Type a comment"
                          type="search"
                          variant="standard"
                        />

                </Box>
           {  loading &&  <Button type="submit" variant="contained"  disabled sx={{ width: "20%", height: "5%", padding:"2px" }}>
              loding...
            </Button>

           } 
            {  !loading &&  <Button type="submit" variant="contained"  sx={{ width: "20%",  height: "5%", padding:"2px" }}>
              Comment
            </Button>

           } 


             

                </Box>

        {/* <Typography variant="body2" color="text.secondary">
      {isTruncated && !showMore && (
        <span>{post.title.slice(0, 20)}...</span>
      )}
      {isTruncated && showMore && <span>{post.title}</span>}
      {!isTruncated && <span>{post.title}</span>}
      {isTruncated && !showMore && <Button onClick={handleShowMore}>Show more</Button>}
      
      {showMore && <Button onClick={handleShowMore}>Show less</Button>}
    </Typography> */}






       </CardContent>
    </Card>
  );
}


