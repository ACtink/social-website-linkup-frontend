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
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { usePostData } from "../utils/usePostData";
import LikeButton from "./LikeButton";
import SinglePostPage from "./SinglePostPage";
 import { useRef } from "react";
import { Link } from "react-router-dom";


export default function PostCard({ post }) {


const [isModalOpen, setIsModalOpen] = React.useState(false);

const modalHandler = () => {
  setIsModalOpen(!isModalOpen);
};

   const formRef = useRef(null);

  const [loading, setLoading] = React.useState(false);


  const [totalLikes, setTotalLikes] = React.useState(post.likes);



  React.useEffect(()=>{

  },[totalLikes])


  const postData = usePostData()


  const [showMore, setShowMore] = React.useState(false);
  const isTruncated = post.title.length > 80; 

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

    formRef.current.reset();

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
    <>
      <SinglePostPage post={post} isOpen={isModalOpen} onClose={modalHandler} />

      <Card
        sx={{
          maxWidth: { xs: "100%", sm: "90%", md: "70%" },

          height: { xs: "30%", sm: "30%", md: "30%" },
          maxHeight: { md: "50%" },
          // height: "40%",
          padding: "5px",
          marginBottom: "20px",
          minWidth: { xs: "100%", sm: "90%", md: "70%" },

          // marginLeft: "10px",
          // marginRight: "10px",
        }}
      >
        <CardHeader
          avatar={
            <Link to={`/profile/${post.username}`}>
              <Avatar
                alt="Profile picture of the user who posted this post"
                src={post.author.profilePic ? post.author.profilePic : "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"}
              />

            </Link>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={post.username}
          subheader={formatTimeStamp(post.timestamp)}
        />

        <CardMedia
          onClick={modalHandler}
          component="img"
          image={post.photoUrl}
          alt="Tree in snow"
          sx={{
            width: "100%",
            maxHeight: { md: "30rem", xs: "32rem" },
            objectFit: { md: "contain", sm: "cover", xs: "cover" },
            padding: "1rem",
          }}
        />

        <CardActions disableSpacing>
          <LikeButton post={post} setTotalLikes={setTotalLikes} />

          <Typography variant="body2">
            <span> {totalLikes} Likes</span>
          </Typography>
        </CardActions>

        <CardContent
          sx={{
            minWidth: "100%",
            wordWrap: "break-word",
            alignItems: "start",
            gap: "15px",
          }}
        >
          <Typography
            component={"div"}
            variant="body1"
            sx={{ color: "text.secondary", minWidth: "15%" }}
          >
            <Box
              sx={{
                fontFamily: "Arial, sans-serif",
                fontSize: "1rem",
                fontStyle: "italic",
                textTransform: "capitalize",
                color: "#031729",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                borderBottom: "1px solid #ddd",
                letterSpacing: "2px",
                fontWeight: 800,
              }}
            >
              <Link to={`/profile/${post.username}`}>
                {post.username.charAt(0).toUpperCase() + post.username.slice(1)}
                -
              </Link>
            </Box>
          </Typography>

          <Typography component={"div"} variant="body2" color="text.secondary">
            {isTruncated && !showMore && (
              <Box sx={{ color: "#1F032A" }}>{post.title.slice(0, 90)}...</Box>
            )}
            {isTruncated && showMore && (
              <Box
                sx={{
                  maxHeight: "20%",
                  flex: "2",
                  color: "#1F032A",
                  wordWrap: "break-word",
                }}
              >
                {post.title}
              </Box>
            )}
            {!isTruncated && <Box sx={{ color: "#1F032A" }}>{post.title}</Box>}
            {isTruncated && !showMore && (
              <Button onClick={handleShowMore}>Show more</Button>
            )}

            {showMore && <Button onClick={handleShowMore}>Show less</Button>}
          </Typography>
        </CardContent>

        <CardContent
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box component="form" ref={formRef} onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                name="comment"
                id="standard-search"
                label="Type a comment"
                type="search"
                variant="standard"
              />
            </Box>
            {loading && (
              <Button
                type="submit"
                variant="contained"
                disabled
                sx={{
                  width: "20%",
                  fontSize: "0.6rem",
                  height: "5%",
                  padding: "2px",
                }}
              >
                loding...
              </Button>
            )}
            {!loading && (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "20%",
                  fontSize: "0.6rem",
                  height: "5%",
                  padding: "2px",
                }}
              >
                Comment
              </Button>
            )}
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
    </>
  );
}


