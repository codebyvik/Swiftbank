import { useNavigate } from "react-router-dom";
// material ui components

import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
// material ui Icons

const ListItemHelper = ({ item, openSidebar }) => {
  const navigate = useNavigate();
  const Icon = item.icon;
  return (
    <ListItem onClick={() => navigate(item.link)} disablePadding sx={{ display: "block" }}>
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
          <Icon />
        </ListItemIcon>
        <ListItemText primary={`${item.name}`} sx={{ opacity: openSidebar ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemHelper;
