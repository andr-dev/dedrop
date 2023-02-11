import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "@fontsource/rubik";

export default function SendScreen() {
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
            <Button variant="contained">Select files to Send</Button>
          </Box>
        </Grid>
        <Grid item xs={4} display="flex" alignItems="center">
          <Stack>
            <Typography variant="h2" pb={2}>Simple, private & decentralized</Typography>
            <Typography variant="h5">Airdrop let's you share files with end-to-end entryption so you can keep what you share private and make sure your stuff doesn't stay online forever.</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <FileDrop />
  );
}
