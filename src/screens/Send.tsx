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
          <Button
            variant="contained"
            style={{
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "20px",
              background: "#4992FF",
              color: "black",
              top: "50%",
              left: "50%",
            }}
          >
            Select files to Send
          </Button>
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
