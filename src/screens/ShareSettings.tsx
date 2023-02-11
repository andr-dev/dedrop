import React from "react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import "@fontsource/rubik";
import SendButton from "./send/SendButton";

const contactsList = [{ label: "Matt Wong" }, { label: "0xa57...069" }];

export default function ShareSettings() {
  const success = false;
  const badAddress = true;

  const ShareModal = () => (
    <Box
      display="flex"
      sx={{
        width: "100%",
        height: "80vh",
        backgroundColor: "#222B3A",
      }}
      p={8}
    >
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: 64,
            fontFamily: "Rubik",
            textAlign: "center",
          }}
          color="text.secondary"
        >
          Your file is ready to share!
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Typography
          variant="h1"
          sx={{
            fontSize: 35,
            fontFamily: "Rubik",
            textAlign: "center",
          }}
          color="text.secondary"
        >
          Who do you want to share with?
        </Typography>
        <br></br>
        <div style={{ marginLeft: "10%" }}>
          <Autocomplete
            disablePortal
            id="address-or-contact-entry"
            options={contactsList}
            renderInput={(params) => (
              <TextField
                label="Enter Contact Name or Polygon Address"
                variant="outlined"
                style={{
                  background: "#222B3A",
                  borderWidth: "0px",
                  fontFamily: "Rubik",
                  borderRadius: "15px",
                }}
                {...params}
              ></TextField>
            )}
          />
          {badAddress ? (
            <Typography
              variant="h1"
              sx={{
                fontSize: 20,
                fontFamily: "Rubik",
                color: "red",
              }}
              color="text.secondary"
            >
              Sorry, this is an invalid Polygon Address
            </Typography>
          ) : (
            <div></div>
          )}
          <br></br>
          <br></br>
          <br></br>
          {SendButton(success)}
        </div>
      </div>
    </Box>
  );
  return <ShareModal />;
}
