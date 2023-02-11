import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OnboardingDoneScreen() {
  const navigate = useNavigate();

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
        onClick={() => navigate("/")}
      >
        <Typography
          variant="h6"
          style={{
            fontFamily: "Rubik",
            borderRadius: "15px",
            background: "#4992FF",
          }}
        >
          Start
        </Typography>
      </Button>
    </Stack>
  );
}
