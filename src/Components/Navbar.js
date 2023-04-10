import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu"; 
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import insta from "../Assets/Instagram.JPG";
import { Avatar } from "@mui/material";

export default function Navbar({ userData }) {
    // console.log(userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate(`/profile/${userData.userId}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate(`/login`);
  };

  const handlebannerClick = () => {
    navigate(`/`);
  };

  const handleExplore = () => {
    let win = window.open(
      "https://mui.com/material-ui/getting-started/overview/",
      "_blank"
    );
    win.focus();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp; Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        <p> &nbsp;&nbsp; Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp; Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        <p> &nbsp;&nbsp; Logout</p>
      </MenuItem>
    </Menu>
  );

  //   style={{ background: 'white' }}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "white" }}>
        <Toolbar>
          <div style={{ marginLeft: "5%" }}>
            <img
              src={insta}
              style={{ width: "20vh" }}
              alt="insta_img"
              onClick={handlebannerClick}
            />
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              color: "black",
              alignItems: "center",
              marginRight: "4rem",
            }}
          >
            <HomeIcon
              onClick={handlebannerClick}
              sx={{ marginRight: "1rem", cursor: "pointer" }}
            />
            <ExploreIcon
              onClick={handleExplore}
              sx={{ marginRight: "1rem", cursor: "pointer" }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={userData.profileImage} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" },color: "black", }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
