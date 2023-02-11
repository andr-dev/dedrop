import { Box, Button, Stack, Typography } from "@mui/material";

import Logo from "../../assets/logo.png";
export default function OnboardingDoneScreen() {
  return (
    <Stack spacing={30} maxWidth="sm">
      <Typography variant="h1" align="center">
        Let's Go
      </Typography>
      <Button
        variant="contained"
        style={{
          background: "#4992FF",
          fontFamily: "Rubik",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h6" style={{ fontFamily: "Rubik" }}>
          Start
        </Typography>
      </Button>
    </Stack>
  );
}
