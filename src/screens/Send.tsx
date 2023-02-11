import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import SendIcon from "@mui/icons-material/Send";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

export default function SendScreen() {
  return (
    <Box sx={{ auto: 250 }} role="presentation">
      <List>
        <br></br>
        <ListItem key={"home"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={"Send"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"send"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={"Send"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"receive"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SystemUpdateAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Receive"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"contacts"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary={"Contacts"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
