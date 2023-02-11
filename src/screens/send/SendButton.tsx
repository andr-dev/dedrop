import { Button, Typography } from "@mui/material";

export default function SendButton(success: boolean) {
  if (success) {
    return (
      <Typography
        variant="h1"
        sx={{
          fontSize: 35,
          fontFamily: "Rubik",
          textAlign: "center",
        }}
        color="text.secondary"
      >
        Your files have been sent! ✅
      </Typography>
    );
  }
  return (
    <Button
      variant="contained"
      style={{
        marginLeft: "30%",
        fontFamily: "Rubik",
        background: "#4992FF",
        color: "white",
        borderRadius: "15px",
        fontSize: 25,
      }}
    >
      Send
    </Button>
  );
}
