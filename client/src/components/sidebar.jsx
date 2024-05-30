import { useNavigate } from "react-router-dom";
// material ui components
import MuiDrawer from "@mui/material/Drawer";
import {
  styled,
  useTheme,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
// material ui Icons
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AccountBalance,
  Groups,
  PeopleAlt,
  ReceiptLong,
  SpaceDashboard,
  ChevronLeft,
  ChevronRight,
  DarkMode,
  LightMode,
  AccountTree,
  AdminPanelSettings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/config.slice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const { user } = useSelector((state) => state.user);
  const mode = useSelector((state) => state.config.mode);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };
  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Drawer variant="permanent" open={openSidebar}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem onClick={() => navigate("/")} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openSidebar ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openSidebar ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {user && user.user_type === "admin" ? <AdminPanelSettings /> : <SpaceDashboard />}
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} sx={{ opacity: openSidebar ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {user && user.user_type === "admin" ? (
          <>
            <ListItem
              onClick={() => navigate("/accounts")}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openSidebar ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openSidebar ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAlt />
                </ListItemIcon>
                <ListItemText primary={"All Accounts"} sx={{ opacity: openSidebar ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={() => navigate("/branch")} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openSidebar ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openSidebar ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountTree />
                </ListItemIcon>
                <ListItemText primary={"All branches"} sx={{ opacity: openSidebar ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem
            onClick={() => navigate(`/account-info/${user?.id}`)}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: openSidebar ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openSidebar ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary={"My Account"} sx={{ opacity: openSidebar ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem
          onClick={() => navigate("/transactions")}
          disablePadding
          sx={{ display: "block" }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openSidebar ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openSidebar ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ReceiptLong />
            </ListItemIcon>
            <ListItemText primary={"Transactions"} sx={{ opacity: openSidebar ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {user && user.user_type === "admin" ? (
          <></>
        ) : (
          <ListItem
            onClick={() => navigate("/beneficiaries")}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: openSidebar ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openSidebar ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Groups />
              </ListItemIcon>
              <ListItemText primary={"Beneficiaries"} sx={{ opacity: openSidebar ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem onClick={toggle} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openSidebar ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openSidebar ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </ListItemIcon>
            <ListItemText sx={{ opacity: openSidebar ? 1 : 0 }}>
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
