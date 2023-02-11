import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "@fontsource/rubik";
import Logo from "../../assets/logo.png";

export const ContactCard = () => (
    <Card sx={{ background: "#222B3A", borderRadius: "20px" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 30, fontFamily: "Rubik", paddingLeft: "5%" }}
          color="text.secondary"
          gutterBottom
        >
          Contacts
        </Typography>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ paddingLeft: "10%" }}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontFamily: "Rubik",
                  display: "inline-block",
                }}
                color="text.secondary"
                gutterBottom
              >
                test
              </Typography>
              <FileDownloadIcon
                style={{
                  marginLeft: "5%",
                  transform: "scale(1.5)",
                  display: "inline-block",
                }}
              ></FileDownloadIcon>{" "}
            </div>
          </Grid>
        </Grid>{" "}
      </CardContent>
    </Card>
  );