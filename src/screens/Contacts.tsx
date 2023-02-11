import { Box, Container, Grid, List, Stack, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { ContactCard } from "./contacts/ContactCard";
import { FixedSizeList, ListChildComponentProps } from 'react-window';

export default function ContactsScreen() {
  return (
    // <Grid container columnSpacing={2}>
    <Stack direction="row" columnGap={2}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          id="address-or-contact"
          label="Search for an address or contact"
          variant="outlined"
          size="small"
          style={{ background: "#222B3A", borderWidth: "0px" }}
        ></TextField>
        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
        </List>
      </Stack>

      <ContactCard></ContactCard>

    </Stack>
  );
}