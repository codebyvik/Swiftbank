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
import ListItemHelper from "./__list_item";

// MUI Defaults

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

// side bar component

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const { user } = useSelector((state) => state.user);
  const mode = useSelector((state) => state.config.mode);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };
  const toggle = () => {
    dispatch(toggleDarkMode());
  };

  const CustomerDashboardItems = [
    { name: "Dashboard", icon: SpaceDashboard, link: "/" },
    { name: "My Account", icon: AccountBalance, link: `/account-info/${user?.id}` },
    { name: "Transactions", icon: ReceiptLong, link: "/transactions" },
    { name: "Beneficiaries", icon: Groups, link: "/beneficiaries" },
  ];

  const AdminDashboardItems = [
    { name: "Dashboard", icon: AdminPanelSettings, link: "/" },
    { name: "All Accounts", icon: PeopleAlt, link: "/accounts" },
    { name: "All branches", icon: AccountTree, link: "/branch" },
    { name: "Transactions", icon: ReceiptLong, link: "/transactions" },
  ];

  return (
    <Drawer variant="permanent" open={openSidebar}>
      {/* OPEN and CLOSE ICON */}
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {user && user.user_type === "admin"
          ? AdminDashboardItems.map((item) => {
              return <ListItemHelper key={item.name} item={item} openSidebar={openSidebar} />;
            })
          : CustomerDashboardItems.map((item) => {
              return <ListItemHelper key={item.name} item={item} openSidebar={openSidebar} />;
            })}
      </List>
      <Divider />
      {/* dark mode toggle */}
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
