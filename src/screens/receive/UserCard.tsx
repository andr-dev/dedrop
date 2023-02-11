import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "@fontsource/rubik";

export const UserCard = ({ name, publicKey }: { name: string, publicKey: string }) => (
  <Box sx={{ background: "#222B3A", borderRadius: "20px", width: "100%" }} p={2}>
    <Stack direction="row" spacing={2} display="flex" alignItems="center">
      <AccountCircleIcon
        fontSize="large"
        style={{
          color: "#FFFFFF"
        }}
      ></AccountCircleIcon>
      <Typography
        sx={{ fontSize: 25, fontFamily: "Rubik" }}
        color="text.secondary"
      >
        {name}
      </Typography>
      <Typography
        sx={{ fontSize: 15, fontFamily: "Rubik" }}
        color="text.secondary"
      >
        {publicKey}
      </Typography>
    </Stack>
  </Box>
);
