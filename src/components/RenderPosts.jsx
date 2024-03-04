import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";

import PostCard from "./PostCard"


function RenderPosts({ posts, setPosts, error }) {
  const skeletonWidth = "60vw";
  const skeletonHeight = 300;

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
        `}
      </style>
      <Box
        sx={{
          display: { md: "flex", sm: "flex", xs: "flex" },
          width: "100vw",
          paddingTop: "100px",
          paddingBottom: "100px",
          flexDirection: "column",
          bgcolor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error && <h1 style={{ marginTop: "100px" }}>{error}</h1>}

        {posts
          ? posts.map((post, indx) => (
              <Box
                key={indx}
                sx={{
                  display: { xs: "block", sm: "flex", md: "flex" },
                  justifyContent: "center",
                  width: { xs: "95%", sm: "90%", md: "50%" },
                  marginX: "auto",
                  padding: "10px",
                }}
              >
                <PostCard key={indx + "post.title"} post={post} />
              </Box>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: { xs: "block", sm: "flex", md: "flex" },
                  justifyContent: "center",
                  width: { xs: "95%", sm: "90%", md: "50%" },
                  marginX: "auto",
                  padding: "10px",
                }}
              >
                <Card
                  sx={{
                    maxWidth: { xs: "100%", sm: "90%", md: "70%" },
                    height: { xs: "30%", sm: "30%", md: "30%" },
                    maxHeight: { md: "50%" },
                    padding: "5px",
                    marginBottom: "20px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Skeleton
                        variant="circular"
                        sx={{ width: 40, height: 40 }}
                      />
                    }
                    action={
                      <Skeleton
                        variant="circular"
                        sx={{ width: 40, height: 40 }}
                      />
                    }
                    title={<Skeleton variant="text" sx={{ width: 100 }} />}
                    subheader={<Skeleton variant="text" sx={{ width: 80 }} />}
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: skeletonWidth,
                      height: skeletonHeight,
                      minWidth: { xs: "100%" },
                      position: "relative",
                      animation: "shimmer 1s infinite",
                    }}
                  />
                  <CardActions disableSpacing>
                    <Skeleton variant="text" sx={{ width: 80 }} />
                  </CardActions>
                  <CardContent>
                    <Skeleton variant="text" sx={{ width: "70%" }} />
                    <Skeleton variant="text" sx={{ width: "90%" }} />
                    <Skeleton variant="text" sx={{ width: "80%" }} />
                    <Skeleton variant="text" sx={{ width: "60%" }} />
                  </CardContent>
                </Card>
              </Box>
            ))}
      </Box>
    </>
  );
}

export default RenderPosts;
