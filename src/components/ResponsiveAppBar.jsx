import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import PublicIcon from '@mui/icons-material/Public';
import { useAxiosForToken } from "../hooks/useAxiosForToken";








function ResponsiveAppBar({ isLoggedIn , userProfile, setUserProfile  }) {



const settings = [
  { value: "", link: "/", showOnLoggedin: false },
  { value: "", link: "/", showOnLoggedin: true },
  { value: `Profile`, link: `/profile/${userProfile.username}`, showOnLoggedin: true },
  { value: "SignIn", link: "/signin", showOnLoggedin: false },
  { value: "SignUp", link: "/signup", showOnLoggedin: false },
  { value: "NewPost", link: "/newpost", showOnLoggedin: true },

  { value: "AllPosts", link: "/allposts" , showOnLoggedin: true },
  { value: "SignOut", link: "/signout" , showOnLoggedin: true },
];

















  const [anchorElUser, setAnchorElUser] = React.useState();


      const [userName, setUserName] = React.useState(
        localStorage.getItem("userName") || "Guest"
      );

    
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // React.useEffect(()=>{


  // },[isLoggedIn ])



 















  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 2 }}>
          <Box sx={{ display: { xs: "flex", md: "flex" }, flexGrow: 1 }}>
            <Link to={"/"}>
              {" "}
              <PublicIcon
                sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
              />{" "}
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Link Up
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <Avatar
                  alt="Profile picture of the user who posted this post"
                  src={
                    userProfile.profilePic
                      ? userProfile.profilePic
                      : "https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn &&
                settings.map(
                  (setting, indx) =>
                    setting.showOnLoggedin && (
                      <MenuItem key={indx} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {isLoggedIn && setting.showOnLoggedin && (
                            <Link to={`${setting.link}`}>
                              {setting.showOnLoggedin && setting.value
                                ? setting.value
                                : "Home"}
                            </Link>
                          )}
                        </Typography>
                      </MenuItem>
                    )
                )}

              {!isLoggedIn &&
                settings.map(
                  (setting, indx) =>
                    !setting.showOnLoggedin && (
                      <MenuItem key={indx} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {!isLoggedIn && !setting.showOnLoggedin && (
                            <Link to={`${setting.link}`}>
                              {!setting.showOnLoggedin && setting.value
                                ? setting.value
                                : "Home"}
                            </Link>
                          )}
                        </Typography>
                      </MenuItem>
                    )
                )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
