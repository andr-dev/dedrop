import { Box, Container, Grid, List, Stack, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { invoke } from "@tauri-apps/api";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { AddCircle, UndoRounded } from "@mui/icons-material";
import ContactCard from "./contacts/ContactCard";

export type Contacts = Map<string, string>;

export default function ContactsScreen() {
  let [contacts, setContacts] = useState<string[][]>([]);
  let [currentContactIdx, setCurrentContactIdx] = useState<number>();

  useEffect(() => {
    invoke("filter_contacts", { "filter": "" }).then((val) => {
      setContacts(Object.entries(val as Contacts));
    });
  }, []);

  return (
    <Stack direction="row" columnGap={2}>
      <Stack spacing={2}>
        <Stack direction="row">
          <TextField
            fullWidth
            id="address-or-contact"
            label="Search for an address or contact"
            variant="outlined"
            size="small"
            style={{ background: "#222B3A", borderWidth: "0px" }}
          ></TextField>
          <Button onClick={() => {
            setCurrentContactIdx(undefined)
            console.log(currentContactIdx)
          }}>
            <AddCircle></AddCircle>
          </Button>
        </Stack>

        <List style={{ maxHeight: '600px', overflow: 'auto' }}>
          {contacts.map(([name, publicKey], value) => <Button key={publicKey} onClick={() => {
            setCurrentContactIdx(value)
            console.log(currentContactIdx)
          }}>
            <UserCard name={name} />
          </Button>)}
        </List>
      </Stack>

      {currentContactIdx !== undefined &&
        <ContactCard
          name={contacts[currentContactIdx][0]}
          address={contacts[currentContactIdx][1]}
        />}

      {currentContactIdx === undefined && <ContactCard
        name=""
        address=""
      />}
    </Stack>)

}