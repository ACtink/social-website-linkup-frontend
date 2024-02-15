


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
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatTimeStamp } from "../utils/formatTimeStamp";

export default function PostCard({ post }) {
  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm:"90%", md: '50%' },

        height:{ xs: '30%', sm:"30%", md: '30%' },
        // height: "40%",
        padding: "10px",
        marginBottom: "20px",
        marginLeft: "10px",
        marginRight: "10px",
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
          height: "100%", // Ensure image takes full height of CardMedia
          objectFit: "cover" // Maintain aspect ratio and fill the container
        }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
