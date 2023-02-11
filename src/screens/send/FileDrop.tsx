import { Box, Button, Container } from "@mui/material";

export const FileDrop = () => (
  <Box
    sx={{
      width: "1200px",
      height: "750px",
      backgroundColor: "#222B3A",
      borderRadius: "20px",
    }}
    role="presentation"
  >
    <Container>
      <Box
        sx={{
          height: "650px",
          width: "650px",
          paddingLeft: "100px",
          paddingTop: "300px",
          border: "dashed",
          borderRadius: "20px",
        }}
      >
        <Button
          variant="contained"
          style={{
            fontFamily: "Rubik",
            background: "#4992FF",
            color: "white",
            top: "50%",
            left: "50%",
          }}
        >
          Select files to Send
        </Button>
      </Box>
    </Container>
  </Box>
);
