import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import "@fontsource/rubik";

import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { appDir } from "@tauri-apps/api/path";
import Logo from "../../assets/logo.png";
import Landing from "../../assets/landing.png";

export default function OnboardingPrivateKey() {
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
          ></TextField>
          <Typography
            variant="subtitle2"
            style={{ textAlign: "center", fontFamily: "Rubik" }}
          >
            or
          </Typography>
          <Button variant="contained" style={{ fontFamily: "Rubik" }}>
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
