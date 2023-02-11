import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import "@fontsource/rubik";

import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { appDir } from "@tauri-apps/api/path";
import Logo from "../../assets/logo.png";
import Landing from "../../assets/landing.png";
import { appContext } from "src/context";
import StreamrClient from "streamr-client";

export default function OnboardingPrivateKey({
  incrementPage,
}: {
  incrementPage: () => void;
}) {
  const generatePrivateKey = () => {
    const key = StreamrClient.generateEthereumAccount().privateKey.substring(2);
    // TODO: Do something with the privateKey here
    incrementPage();
  };

  const handlePrivateKeyChange = (key: string) => {
    const re = new RegExp("[0-9a-fA-F]{64}$");
    if (re.test(key)) {
      // TODO: Do something with the privateKey here
      incrementPage();
    }
  };

  const OnboardingPrivateKey = () => (
    <Grid container spacing={2}>
      <Grid
        item
        xs={7}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img style={{ width: "100%" }} src={Landing} alt="landing" />
      </Grid>
      <Grid item xs={5} display="flex" alignItems="center">
        <Stack spacing={1} width="100%">
          <Box display="flex" justifyContent="center">
            <img src={Logo} style={{ height: 96 }} alt="logo" />
          </Box>
          <Typography
            variant="h3"
            style={{ textAlign: "center", fontFamily: "Rubik" }}
            pt={4}
          >
            Airdrop
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ textAlign: "center", fontFamily: "Rubik" }}
            pb={4}
          >
            Decentralized File Sharing
          </Typography>
          <TextField
            fullWidth
            id="use-private-key"
            label="Use Private Key"
            placeholder="92a..."
            size="small"
            inputProps={{ style: { color: "white" } }}
            style={{
              borderWidth: "0px",
              borderRadius: "10px",
              fontFamily: "Rubik",
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handlePrivateKeyChange(event.target.value);
            }}
          ></TextField>
          <Typography
            variant="subtitle2"
            style={{ textAlign: "center", fontFamily: "Rubik" }}
          >
            or
          </Typography>
          <Button
            variant="contained"
            style={{
              fontFamily: "Rubik",
              background: "#4992FF",
              borderRadius: "15px",
            }}
            onClick={() => generatePrivateKey()}
          >
            <Typography variant="subtitle1" style={{ fontFamily: "Rubik" }}>
              Generate Private Key
            </Typography>
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );

  return <OnboardingPrivateKey />;
}
