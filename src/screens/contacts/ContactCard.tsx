import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import "@fontsource/rubik";
import { Save } from "@mui/icons-material";
import { useState } from "react";

interface Contact {
  name: string
  address: string
}

export default function ContactCard({ name, address, create, onSubmit }: { name: string, address: string, create?: boolean, onSubmit: (public_key: string, name: string) => void }) {

  let [contact, setContact] = useState<Contact>({
    address: address,
    name: name,
  });

  return (<Card sx={{ background: "#222B3A", borderRadius: "20px" }}>
    <CardContent>
      <Stack pl={2} pr={2} spacing={2}>
        <Stack direction="row">
          <Typography
            sx={{ fontSize: 30, fontFamily: "Rubik" }}
            color="text.secondary"
          >
            {(create ?? false) ? "Add Contact" : "Update Contact"}
          </Typography>

          <Button onClick={() => onSubmit(contact.address, contact.name)}>
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
            disabled={!create}
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
  </Card >
  )
}