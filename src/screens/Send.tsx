import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import SendIcon from "@mui/icons-material/Send";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import Logo from "../assets/logo.png";
import "@fontsource/rubik";
import { FileDrop } from "./send/FileDrop";

export default function SendScreen() {
  const SideBar = () => (
    <Box
      sx={{
        width: "40%",
        height: "60%",
        backgroundColor: "#222B3A",
        borderRadius: "25px",
      }}
      role="presentation"
    >
      <List style={{ textAlign: "center" }}>
        <ListItem
          key={"send"}
          disablePadding
          style={{ display: "inline-block", textAlign: "center" }}
        >
          <div>
            <ListItemButton style={{ display: "block", textAlign: "center" }}>
              <ListItemIcon style={{ display: "block" }}>
                <img src={Logo} style={{ width: "50%" }}></img>
              </ListItemIcon>
            </ListItemButton>
          </div>
        </ListItem>
        <br></br>
        <br></br>
        <br></br>
        <ListItem
          key={"send"}
          disablePadding
          style={{ display: "inline-block", textAlign: "center" }}
        >
          <div>
            <ListItemButton style={{ display: "block", textAlign: "center" }}>
              <ListItemIcon style={{ display: "block" }}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary={"Send"} style={{ display: "block" }} />
            </ListItemButton>
          </div>
        </ListItem>
        <ListItem
          key={"receive"}
          disablePadding
          style={{ display: "inline-block", textAlign: "center" }}
        >
          <div>
            <ListItemButton style={{ display: "block", textAlign: "center" }}>
              <ListItemIcon style={{ display: "block" }}>
                <SystemUpdateAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Receive"} style={{ display: "block" }} />
            </ListItemButton>
          </div>
        </ListItem>
        <ListItem
          key={"contacts"}
          disablePadding
          style={{ display: "inline-block", textAlign: "center" }}
        >
          <div>
            <ListItemButton style={{ display: "block", textAlign: "center" }}>
              <ListItemIcon style={{ display: "block" }}>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary={"Contacts"} style={{ display: "block" }} />
            </ListItemButton>
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return <FileDrop></FileDrop>;
}
