import { Box, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { UserCard } from "./receive/UserCard";
import { FileCard } from "./receive/FileCard";
import { useContext, useEffect, useState } from "react";
import { appContext } from "src/context";
import { invoke } from "@tauri-apps/api";
import { Contacts } from "./Contacts";

export default function ReceiveScreen() {
  let [contacts, setContacts] = useState<string[][]>([]);
  let [files, setFiles] = useState<any[][]>([]);

  let { streamrClient } = useContext(appContext).state;

  const updateFiles = () => {
    invoke("get_files").then((files) => {
      console.log(files);
      setFiles(files as any[][]);
    })
  }

  useEffect(() => {
    invoke("filter_contacts", { "filter": "" }).then((contacts) => {
      setContacts(Object.entries(contacts as Contacts));
    });

    updateFiles();
  }, []);

  useEffect(() => {
    streamrClient.getSubscriptions().then((subscriptions) => {
      let shouldUnsubscribe = subscriptions.filter(s => s.streamPartId in contacts);

      for (let su of shouldUnsubscribe) {
        console.log("unsubscribing from ", su);
        su.unsubscribe();
      }

      for (let [publicKey, name] of contacts) {
        if (!subscriptions.some((x) => x.streamPartId.startsWith(publicKey))) {
          console.log("subscribing to ", publicKey);
          streamrClient.subscribe({ streamId: `${publicKey}/foo/bar` }, (payload) => {
            console.log("payload", payload)
            invoke("save_file", { publicKey: publicKey, payload: JSON.stringify(payload) }).then(() => {
              console.log("saved file!");
              updateFiles();
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
              <TableCell align="center" width={64}>Size</TableCell>
              <TableCell align="center" width={192}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((row: any) => (
              <TableRow
                key={row[1].filename}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row[1].filename}
                </TableCell>
                <TableCell align="right">{row[0]}</TableCell>
                <TableCell align="center">{row[1].size}</TableCell>
                <TableCell align="center">{new Date(row[1].time).toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
