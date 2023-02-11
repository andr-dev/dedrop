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
        <img
          style={{ transform: "scale(1)", maxWidth: "100%" }}
          src={Landing}
          alt="landing"
        />
      </Grid>
      <Grid item xs={5} display="flex" alignItems="center">
        <Stack>
          <img style={{ transform: "scale(.6)" }} src={Logo} alt="logo" />
          <Typography
            variant="h3"
            pb={2}
            style={{ textAlign: "center", fontFamily: "Rubik" }}
          >
            Airdrop
          </Typography>
          <Typography
            variant="subtitle1"
            pb={2}
            style={{ textAlign: "center", fontFamily: "Rubik" }}
          >
            Decentralized File Sharing
          </Typography>
          <br></br>
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
          <br></br>
          <Typography
            variant="subtitle2"
            style={{ textAlign: "center", fontFamily: "Rubik" }}
          >
            or
          </Typography>
          <br></br>
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
