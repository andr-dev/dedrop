import React from "react";
import {
  Box,
  Button,
  Container,
} from "@mui/material";
import "@fontsource/rubik";

export default function SendScreen() {
  const FileDrop = () => (
    <Box
      sx={{
        width: "1116px",
        height: "765px",
        backgroundColor: "#222B3A",
        borderRadius: "20px",
      }}
      role="presentation"
    >
      <Container>
        <Box
          sx={{
            height: "670px",
            width: "720px",
            border: "dashed",
            borderRadius: "20px",
          }}
        >
          <Button variant="contained">Select files to Send</Button>
        </Box>
      </Container>
    </Box>
  );
  return (
    <FileDrop />
  );
}
