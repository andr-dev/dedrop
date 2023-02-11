import { Box, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import "@fontsource/rubik";
import PlaceholderPic from "../../assets/contacts-profile-placeholder.png";

export const ContactCard = () => (
  <Card sx={{ background: "#222B3A", borderRadius: "20px" }}>
    <CardContent>
      <Stack pl={2} pr={2} spacing={2}>
        <Typography
          sx={{ fontSize: 30, fontFamily: "Rubik" }}
          color="text.secondary"
        >
          Contacts
        </Typography>
        <img
          src={PlaceholderPic}
          alt="Placeholder Pic"
          style={{
            borderRadius: '20px'
          }}
        />
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
          ></TextField>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);