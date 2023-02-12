import { Grid, List, ListItem, Stack, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { invoke } from "@tauri-apps/api";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { AddCircle } from "@mui/icons-material";
import ContactCard from "./contacts/ContactCard";

export type Contacts = Map<string, string>;

export default function ContactsScreen() {
  let [contacts, setContacts] = useState<string[][]>([]);
  let [currentContactIdx, setCurrentContactIdx] = useState<number | null | undefined>();

  const fetchContacts = () => {
    return invoke("filter_contacts", { "filter": "" }).then((val) => {
      setContacts(Object.entries(val as Contacts));
    });
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Grid container height="100%" width="100%" columnSpacing={4}>
      <Grid item xs={currentContactIdx === undefined ? 12 : 6}>
        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            id="address-or-contact"
            label="Search for an address or contact"
            variant="outlined"
            size="small"
            style={{ background: "#222B3A", borderWidth: "0px" }}
          ></TextField>
          <Button onClick={() => {
            setCurrentContactIdx(currentContactIdx === null ? undefined : null)
          }}>
            <AddCircle></AddCircle>
          </Button>
        </Stack>

        <List style={{ maxHeight: '600px', overflow: 'auto' }}>
          {contacts.map(([publicKey, name], value) => (
            <ListItem style={{ padding: 0 }}><Button key={publicKey} onClick={() => {
              setCurrentContactIdx(value);
            }} fullWidth>
              <UserCard name={name} publicKey={publicKey} />
            </Button></ListItem>
          ))}
        </List>
      </Grid>
      {
        currentContactIdx !== undefined ? (
          <Grid item xs={currentContactIdx === undefined ? 12 : 6}>
            {
              currentContactIdx !== null ?
                <ContactCard
                  key={contacts[currentContactIdx][0]}
                  address={contacts[currentContactIdx][0]}
                  name={contacts[currentContactIdx][1]}
                  onSubmit={(public_key, name) => {
                    let idx = currentContactIdx;
                    setCurrentContactIdx(undefined);
                    invoke("add_contact", { "publicKey": public_key, "name": name }).then(() => fetchContacts()).then(() => {
                      setCurrentContactIdx(idx);
                    })
                  }}
                  onDelete={(public_key) => {
                    setCurrentContactIdx(undefined);
                    invoke("del_contact", { "publicKey": public_key }).then(() => fetchContacts())
                  }}
                /> : <ContactCard
                  key="contactCreate"
                  address=""
                  name=""
                  create
                  onDelete={(public_key) => {
                  }}
                  onSubmit={(public_key, name) => {
                    setCurrentContactIdx(undefined);
                    invoke("add_contact", { "publicKey": public_key, "name": name }).then(() => fetchContacts());
                  }}
                />
            }
          </Grid>
        ) : null
      }
    </Grid >)

}