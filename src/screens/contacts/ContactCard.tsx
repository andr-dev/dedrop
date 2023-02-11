import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import "@fontsource/rubik";
import PlaceholderPic from "../../assets/contacts-profile-placeholder.png";
import { Save } from "@mui/icons-material";
import { useState } from "react";
import { invoke } from "@tauri-apps/api";

interface Contact {
  name: string
  address: string
}

export default function ContactCard({name, address}: {name: string, address: string}) {

  let [contact, setContact] = useState<Contact>({
    name: name,
    address: address
  });

  return (<Card sx={{ background: "#222B3A", borderRadius: "20px" }}>
    <CardContent>
      <Stack pl={2} pr={2} spacing={2}>
        <Stack direction="row" space-around>
          <Typography
          sx={{ fontSize: 30, fontFamily: "Rubik" }}
          color="text.secondary"
        >
          Contacts
        </Typography>

        <Button onClick={() => {
          invoke("add_contact", { "name": contact.name, "stream": contact.address });
        }}>
          <Save></Save>
        </Button>
        </Stack>
        
        <Stack direction="row" spacing={1} display="flex" alignItems="center">
          <AccountCircleIcon
            fontSize="large"
          />
          <TextField
            fullWidth
            id="address-or-contact"
            label="Name"
            variant="outlined"
            size="small"
            style={{ background: "#222B3A", borderWidth: "0px" }}
            defaultValue={name}
            onChange={(e) => setContact({
              name: e.target.value,
              address: contact.address
            })}
          ></TextField>
        </Stack>
        <Stack direction="row" spacing={1} display="flex" alignItems="center">
          <AlternateEmailIcon
            fontSize="large"
          ></AlternateEmailIcon>
          <TextField
            fullWidth
            id="address-or-contact"
            label="ETH address"
            variant="outlined"
            size="small"
            style={{ background: "#222B3A", borderWidth: "0px" }}
            defaultValue={address}
            onChange={(e) => setContact({
              name: contact.name,
              address: e.target.value
            })}
          ></TextField>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
)
}