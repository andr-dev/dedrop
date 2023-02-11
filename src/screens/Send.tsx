import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import "@fontsource/rubik";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { appContext } from "src/context";
import { streamPermissionToSolidityType } from "streamr-client/types/src/permission";
import { Contacts } from "./Contacts";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SendScreen() {
  let [contacts, setContacts] = useState<Contacts>({} as Contacts);
  const [sendSuccessToastOpen, setSuccessSendToastOpen] = React.useState(false);
  const [successToastMessage, setSuccessToastMessage] =
    React.useState("Success!");
  const [sendErrorToastOpen, setErrorSendToastOpen] = React.useState(false);
  const [errorToastMessage, setErrorToastMessage] = React.useState("Error!");

  const handleClick = (res: any) => {
    setSuccessSendToastOpen(true);
    const message = `Successfully sent ${res.content.contents.length} bytes to stream ${res.streamId}`;
    setSuccessToastMessage(message);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSendToastOpen(false);
  };

  const handleError = (res: any) => {
    setErrorSendToastOpen(true);
    const message = `Errored sending to stream: ${res}`;
    setErrorToastMessage(message);
  };
  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSendToastOpen(false);
  };

  let context = useContext(appContext);

  useEffect(() => {
    invoke("filter_contacts", { filter: "" }).then((contacts) => {
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
        <Grid
          item
          xs={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            sx={{
              width: "100%",
              height: "100%",
              border: "dashed",
              borderRadius: "20px",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              onClick={() => {
                open({
                  directory: false,
                  multiple: false,
                }).then((selected) => {
                  invoke("load_file", { path: selected })
                    .then((file) =>
                      context.state.streamrClient
                        .getOrCreateStream({
                          id: "/foo/bar",
                        })
                        .then((stream) => {
                          stream.publish(file).then((res) => handleClick(res));
                        })
                    )
                    .catch((err) => handleError(err));
                });
              }}
            >
              Select files to Send
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4} display="flex" alignItems="center">
          <Stack>
            <Typography variant="h3" pb={2}>
              Simple, private & decentralized
            </Typography>
            <Typography variant="h6">
              Airdrop let's you share files with end-to-end entryption so you
              can keep what you share private and make sure your stuff doesn't
              stay online forever.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        open={sendSuccessToastOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successToastMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={sendErrorToastOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorToastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );

  return <FileDrop />;
}
