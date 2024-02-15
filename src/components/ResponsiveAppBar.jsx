import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import PublicIcon from '@mui/icons-material/Public';

const settings = [
  { value: "Profile", showOnLoggedin: true },
  { value: "SignIn", showOnLoggedin: false },
  { value: "SignUp", showOnLoggedin: false },
  { value: "NewPost", showOnLoggedin: true },
  { value: "AllPosts", showOnLoggedin: false },
  { value: "AllPosts", showOnLoggedin: true },
  { value: "SignOut", showOnLoggedin: true },
];

function ResponsiveAppBar({ isLoggedIn }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{background: "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters  sx={{ py: 2 }}>
          <Box sx={{ display: { xs: "flex", md: "flex" }, flexGrow: 1 }}>
            <PublicIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {isLoggedIn && settings.map((setting, indx) => (

                 setting.showOnLoggedin && <MenuItem key={indx} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {isLoggedIn && setting.showOnLoggedin && (
                      <Link to={`/${setting.value.toLowerCase()}`}>
                        {setting.showOnLoggedin && setting.value}
                      </Link>
                    )}
                  </Typography>
                </MenuItem> 



              ))}

              {!isLoggedIn && settings.map((setting, indx) => (
              !setting.showOnLoggedin  && <MenuItem key={indx} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {!isLoggedIn && !setting.showOnLoggedin && (
                      <Link to={`/${setting.value.toLowerCase()}`}>
                        {!setting.showOnLoggedin && setting.value}
                      </Link>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
