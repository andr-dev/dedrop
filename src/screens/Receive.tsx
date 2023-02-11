import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { FileCard } from "./receive/FileCard";
import { useContext, useEffect, useState } from "react";
import { appContext } from "src/context";
import { invoke } from "@tauri-apps/api";
import { Contacts } from "./Contacts";

export default function ReceiveScreen() {
  let [contacts, setContacts] = useState<string[][]>([]);

  let { streamrClient } = useContext(appContext).state;

  useEffect(() => {
    invoke("filter_contacts", { "filter": "" }).then((contacts) => {
      setContacts(Object.entries(contacts as Contacts));
    });
  }, []);

  useEffect(() => {
    streamrClient.getSubscriptions().then((subscriptions) => {
      let shouldUnsubscribe = subscriptions.filter(s => s.streamPartId in contacts);

      for (let su of shouldUnsubscribe) {
        console.log("unsubscribing from ", su);
        su.unsubscribe();
      }

      for (let [key, value] of contacts) {
        if (!subscriptions.some((x) => x.streamPartId.startsWith(value))) {
          console.log("subscribing to ", value);
          streamrClient.subscribe({ streamId: `${value}/foo/bar` }, (payload) => {
            console.log("payload", payload)
            invoke("save_file", { payload: JSON.stringify(payload) }).then(() => {
              console.log("saved file!");
            })
          })
        }
      }
    })
  }, [contacts]);

  return (
    <Grid container height="100%" width="100%" columnSpacing={4}>
      <Grid item xs={6}>
        <Box>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="address-or-contact"
              label="Search for an address or contact"
              variant="outlined"
              size="small"
              style={{
                background: "#222B3A",
                borderWidth: "0px",
                fontFamily: "Rubik",
              }}
            ></TextField>
            {contacts.map(([name, publicKey], value) => <UserCard key={publicKey} name={name} />)}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <FileCard />
        </Box>
      </Grid>
    </Grid>
  );
}
