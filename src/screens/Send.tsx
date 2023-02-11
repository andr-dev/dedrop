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

export default function SendScreen() {
  const SideBar = () => (
    <Box
      sx={{
        width: "121px",
        height: "933px",
        backgroundColor: "#222B3A",
        borderRadius: "25px",
      }}
      role="presentation"
    >
      <List>
        <ListItem key={"home"} disablePadding>
          <ListItemButton>
            <img
              style={{ height: "35px", width: "35px" }}
              src={Logo}
              alt={"Logo"}
            />
          </ListItemButton>
        </ListItem>
        <br></br>
        <ListItem key={"send"} disablePadding>
          <div>
            <ListItemButton style={{ display: "block" }}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary={"Send"} style={{ display: "block" }} />
            </ListItemButton>
          </div>
        </ListItem>
        <ListItem key={"receive"} disablePadding>
          <div>
            <ListItemButton style={{ display: "block" }}>
              <ListItemIcon>
                <SystemUpdateAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Receive"} style={{ display: "block" }} />
            </ListItemButton>
          </div>
        </ListItem>
        <ListItem key={"contacts"} disablePadding>
          <div>
            <ListItemButton style={{ display: "block" }}>
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary={"Contacts"} style={{ display: "block" }} />
            </ListItemButton>
          </div>
        </ListItem>
      </List>
    </Box>
  );
  const FileDrop = () => (
    <Box
      sx={{
        width: "1116px",
        height: "765px",
        backgroundColor: "#222B3A",
        borderRadius: "20px",
      }}
      role="presentation"
    >
      <Container>
        <Box
          sx={{
            height: "670px",
            width: "720px",
            border: "dashed",
            borderRadius: "20px",
          }}
        >
          <Button variant="contained">Select files to Send</Button>
        </Box>
      </Container>
    </Box>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <SideBar></SideBar>
      </Grid>
      <Grid item xs={8}>
        <FileDrop></FileDrop>
      </Grid>
    </Grid>
  );
}
