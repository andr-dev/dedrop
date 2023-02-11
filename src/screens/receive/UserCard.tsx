import { Card, CardContent, Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "@fontsource/rubik";

export const UserCard = () => (
  <Card sx={{ background: "#222B3A", borderRadius: "20px" }}>
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AccountCircleIcon
            style={{
              marginLeft: "10%",
              marginTop: "10%",
              transform: "scale(2.4)",
            }}
          ></AccountCircleIcon>
        </Grid>
        <Grid item xs={8} style={{ margin: "auto" }}>
          <Typography
            sx={{ fontSize: 25, fontFamily: "Rubik" }}
            color="text.secondary"
            gutterBottom
          >
            Matt Wong
          </Typography>
          <Typography
            sx={{ fontSize: 15, fontFamily: "Rubik" }}
            color="text.secondary"
            gutterBottom
          >
            Received at 12:01 PM EST
          </Typography>
        </Grid>
      </Grid>{" "}
    </CardContent>
  </Card>
);
