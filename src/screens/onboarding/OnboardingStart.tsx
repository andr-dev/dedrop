import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import Logo from "../../assets/logo.png";

export default function OnboardingStartScreen() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={4} minWidth="100%">
        <img src={Logo} />
        <Typography variant="h2">Share your files</Typography>
        <Typography variant="h2">without limitations</Typography>
        <Button variant="contained">Get Started</Button>
      </Stack>
    </Box>
  );
}
