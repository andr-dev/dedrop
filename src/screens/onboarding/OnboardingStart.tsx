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
    <Stack spacing={4} minWidth="100%">
      <Box
        display="flex"
        justifyContent="center"
        sx={{ height: 128, width: "50%" }}
      >
        <img src={Logo} height="100%" />
      </Box>
      <Typography variant="h1" align="center">
        Share your files without limitations
      </Typography>
    </Stack>
  );
}
