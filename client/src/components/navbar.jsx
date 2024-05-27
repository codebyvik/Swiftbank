import logo from "../assets/logo-white-transparent-icon.png";
import { AccountBalanceWallet, Logout, AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import {
  IconButton,
  styled,
  Toolbar,
  Box,
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SignoutUserStart } from "../redux/auth/auth.slice";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  const { user } = useSelector((state) => state.user);
  // logout
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(SignoutUserStart());
    handleClose();
  };
  //   used to navigate to links
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  // menu popup when clicked on avatar in navbar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ paddingY: 0 }} position="fixed" open={openSidebar}>
      <StyledToolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,

              ...(openSidebar && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={(e) => navigate("/")}
          >
            <img src={logo} alt="Swiftbank" width="150px" />
          </Box>
        </Box>

        <Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src={`http://localhost:8000/users/avatars/${user.avatar}`}
                sx={{ width: 40, height: 40 }}
                alt="profile image"
              >
                V
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={(e) => {
              navigate("/profile");
              handleClose();
            }}
          >
            <AccountCircle sx={{ marginRight: 0.5, color: "gray" }} />
            Profile
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              navigate("/account/info");
              handleClose();
            }}
          >
            <AccountBalanceWallet sx={{ marginRight: 0.5, color: "gray" }} />
            My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
