import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import SinglePostPage from "./SinglePostPage";
import ModalThatShowsList from "./ModalThatShowsList";
import ModalThatShowsComments from "./modalThatShowsComments";

import { formatTimeStamp } from "../utils/formatTimeStamp";
import { usePostData } from "../utils/usePostData";
import { useRef } from "react";
import { useAxiosForToken } from "../hooks/useAxiosForToken";

export default function PostCard({ post }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const formRef = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [totalLikes, setTotalLikes] = React.useState(post.likes);
  const postData = usePostData();
  const [showMore, setShowMore] = React.useState(false);
  const isTruncated = post.title.length > 80;
  const [isLikesUpdated, setIsLikesUpdated] = React.useState(false);
  const [likesList, setLikesList] = React.useState([]);
  const [commentsList, setCommentsList] = React.useState([]);
  const [postComments, setPostComments] = React.useState(post.comments || []);
  const [isNewCommentCreated, setIsNewCommentCreated] = React.useState(false);
  const privateAxios = useAxiosForToken();

  const handleModalOpen = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      comment: formData.get("comment"),
      postId: post._id,
    };

    formRef.current.reset();

    setLoading(true);

    try {
      const response = await postData(`/posts/${post._id}/comment`, data);

      console.log(response.data.message);

      if (response.data.message) {
        setIsNewCommentCreated(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  React.useEffect(() => {
    const getLikeslist = async () => {
      try {
        privateAxios.defaults.withCredentials = true;

        const response = await privateAxios.get(
          `/posts/${post._id}/likes-list`
        );

        if (response.data) {
          setLikesList(response.data);
          setIsLikesUpdated(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isLikesUpdated) {
      getLikeslist();
    }
  }, [isLikesUpdated, post._id, privateAxios]);

  React.useEffect(() => {
    const getCommentsList = async () => {
      try {
        privateAxios.defaults.withCredentials = true;

        const response = await privateAxios.get(
          `/posts/${post._id}/comments-list`
        );

        if (response.data) {
          setCommentsList(response.data);
          setPostComments(response.data);
          setIsNewCommentCreated(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isNewCommentCreated) {
      console.log("getting new comments");
      getCommentsList();
    }
  }, [isNewCommentCreated]);

  return (
    <>
      {modalType === "singlePost" && (
        <SinglePostPage
          post={post}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}

      {modalType === "likesList" && (
        <ModalThatShowsList
          listData={likesList?.length > 0 ? likesList : post.likesArray}
          listType={"Likes"}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}

      {modalType === "comments" && (
        <ModalThatShowsComments
          listData={commentsList?.length > 0 ? commentsList : postComments}
          listType={"comments"}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}

      <Card
        sx={{
          maxWidth: { xs: "100%", sm: "90%", md: "70%" },
          height: { xs: "30%", sm: "30%", md: "30%" },
          maxHeight: { md: "50%" },
          padding: "5px",
          marginBottom: "20px",
          minWidth: { xs: "100%", sm: "90%", md: "70%" },
          boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Link to={`/post/${post._id}`} component={React.Fragment}>
     
            <CardHeader
              avatar={
                <Link to={`/profile/${post.username}`}>
                  <Avatar
                    alt="Profile picture of the user who posted this post"
                    src={
                      post.author.profilePic
                        ? post.author.profilePic
                        : "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
                    }
                  />
                </Link>
              }
              title={post.username}
              subheader={formatTimeStamp(post.timestamp)}
            />
                    </Link>

            <CardMedia
              component="img"
              image={post.photoUrl}
              alt="Tree in snow"
              sx={{
                display: "block",
                verticalAlign: "middle",
                maxWidth: "100%",
                height: "auto",
                borderStyle: "none",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                imageRendering: "smooth",
                fontStyle: "italic",
                shapeMargin: "1rem",
                cursor: "pointer",
              }}
              onClick={() => handleModalOpen("singlePost")}
            />
            <CardActions disableSpacing>
              <LikeButton
                post={post}
                setTotalLikes={setTotalLikes}
                setIsLikesUpdated={setIsLikesUpdated}
                isLikesUpdated={isLikesUpdated}
              />
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  ml: 1,
                  "&:hover": {
                    color: "#1976D2",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => handleModalOpen("likesList")}
              >
                {totalLikes} Likes
              </Typography>
            </CardActions>
            <CardContent
              sx={{
                wordWrap: "break-word",
                gap: "15px",
              }}
            >
              <Typography
                component={"div"}
                variant="body1"
                sx={{
                  color: "text.secondary",
                }}
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
                    {post.username.charAt(0).toUpperCase() +
                      post.username.slice(1)}
                    -
                  </Link>
                </Box>
              </Typography>

              <Typography
                component={"div"}
                variant="body2"
                color="text.secondary"
              >
                {isTruncated && !showMore && (
                  <Box sx={{ color: "#1F032A" }}>
                    {post.title.slice(0, 90)}...
                  </Box>
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
                {!isTruncated && (
                  <Box sx={{ color: "#1F032A" }}>{post.title}</Box>
                )}
                {isTruncated && !showMore && (
                  <Button
                    onClick={handleShowMore}
                    sx={{
                      color: "#1976D2",
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                    }}
                  >
                    Show more
                  </Button>
                )}

                {showMore && (
                  <Button
                    onClick={handleShowMore}
                    sx={{
                      color: "#1976D2",
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                    }}
                  >
                    Show less
                  </Button>
                )}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  pt: 1,
                  pb: 1,
                  "&:hover": {
                    color: "#1976D2",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => handleModalOpen("comments")}
              >
                {postComments.length > 0 &&
                  `View all ${postComments.length} comments`}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  pt: 1,
                  pb: 1,
                  color: "text.secondary",
                }}
              >
                {postComments.length > 0 &&
                  `Latest comment - ${
                    postComments[postComments.length - 1]?.content
                  }`}
              </Typography>
            </CardContent>

            <CardContent>
              <Box component="form" ref={formRef} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="comment"
                  id="standard-search"
                  label="Type a comment"
                  type="search"
                  variant="standard"
                  sx={{ mt: 1, mb: 1 }}
                />
                {loading ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled
                    sx={{
                      width: "100%",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      bgcolor: "#1976D2",
                      color: "#FFF",
                    }}
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "100%",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      bgcolor: "#1976D2",
                      color: "#FFF",
                    }}
                  >
                    Comment
                  </Button>
                )}
              </Box>
            </CardContent>
   
      </Card>
    </>
  );
}
