import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "@fontsource/rubik";

import { invoke } from "@tauri-apps/api";
import { open } from '@tauri-apps/api/dialog';
import { appContext } from "src/context";
import { streamPermissionToSolidityType } from "streamr-client/types/src/permission";


type Contacts = Record<string, string>;

export default function SendScreen() {
  let [contacts, setContacts] = useState<Contacts>({} as Contacts);

  let context = useContext(appContext);

  useEffect(() => {
    invoke("filter_contacts", { "filter": "" }).then((contacts) => {

      setContacts(contacts as Contacts);
      console.log(contacts);
    });
  }, []);

  const FileDrop = () => (
    <Box
      display="flex"
      sx={{
        width: "100%",
        height: "80vh",
        backgroundColor: "#222B3A",
        borderRadius: "20px",
      }}
      p={8}
    >
      <Grid container spacing={8}>
        <Grid item xs={8} display="flex" alignItems="center" justifyContent="center">
          <Box
            display="flex"
            sx={{
              width: "100%",
              height: "100%",
              border: "dashed",
              borderRadius: "20px",
            }}
            alignItems="center" justifyContent="center"
          >
            <Button variant="contained" onClick={() => {
              open({
                directory: false,
                multiple: false,
              }).then((selected) => {
                invoke("load_file", { "path": selected }).then((file) => {
                  context.state.streamrClient.getOrCreateStream({
                    id: '/foo/bar',
                  }).then((stream) => {
                    stream.publish(file).then((res) => console.log("done!", res))
                  })
                })
              })
            }}>Select files to Send</Button>
          </Box>
        </Grid>
        <Grid item xs={4} display="flex" alignItems="center">
          <Stack>
            <Typography variant="h3" pb={2}>Simple, private & decentralized</Typography>
            <Typography variant="h6">Airdrop let's you share files with end-to-end entryption so you can keep what you share private and make sure your stuff doesn't stay online forever.</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <FileDrop />
  );
}
