import { Container, Grid, List, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { ContactCard } from "./contacts/ContactCard";

export default function ContactsScreen() {
    return (
        <Grid container spacing={2}>
      <Grid xs={6}>
        <Container
          style={{
            height: "90%",
            width: "80%",
            paddingTop: "5%",
          }}
        >
          <List>
            <TextField
              fullWidth
              id="address-or-contact"
              label="Search for an address or contact"
              variant="outlined"
              size="small"
              style={{ background: "#222B3A", borderWidth: "0px" }}
            ></TextField>
            <br></br>
            <br></br>
            <br></br>
            <UserCard></UserCard>
            <br></br>
            <br></br>
            <UserCard></UserCard>
            <br></br>
            <br></br>
            <UserCard></UserCard>
            <br></br>
            <br></br>
            <UserCard></UserCard>
          </List>
        </Container>
      </Grid>
      <Grid xs={6}>
        <Container
          style={{
            height: "90%",
            width: "80%",
            paddingTop: "5%",
          }}
        >
        <ContactCard></ContactCard>
        </Container>
      </Grid>
    </Grid>
    );
}