import { Box, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { FileCard } from "./receive/FileCard";
import { useContext, useEffect, useState } from "react";
import { appContext } from "src/context";
import { invoke } from "@tauri-apps/api";
import { Contacts } from "./Contacts";

export default function ReceiveScreen() {
  let [contacts, setContacts] = useState<string[][]>([]);
  let [files, setFiles] = useState<string[][]>([]);

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
    <Stack sx={{ height: "100%", width: "100%" }} spacing={2} >
      <Stack spacing={2} direction="row">
        <TextField
          fullWidth
          id="address-or-contact"
          label="Search for an address or contact"
          variant="outlined"
          size="small"
          style={{ background: "#222B3A", borderWidth: "0px" }}
        ></TextField>
      </Stack>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Filename</TableCell>
              <TableCell align="right">Sender</TableCell>
              <TableCell align="right">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[].map((row: any) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
