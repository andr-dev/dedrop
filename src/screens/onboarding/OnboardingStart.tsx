import { Box, Stack, Typography } from "@mui/material";

import Logo from "../../assets/logo.png";

export default function OnboardingStartScreen() {
  return (
    <Stack spacing={4} maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        sx={{ height: 128, width: "100%" }}
      >
        <img src={Logo} height="100%" />
      </Box>
      <Typography variant="h2" align="center">
        Share your files. Without limitations.
      </Typography>
    </Stack>
  );
}
