import { ComponentType, useState } from "react";
import OnboardingDone from "./OnboardingDone";
import OnboardingPrivateKey from "./OnboardingPrivateKey";
import OnboardingStart from "./OnboardingStart";

import { Navigate } from "react-router-dom";
import { Box, Button, Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { OnboardingProgress } from "./OnboardingProgress";
interface OnboardingScreen {
  /**
   * React component for rendering this screen.
   */
  component: ComponentType<any>;
  /**
   * Unique key used to record progression to this screen
   */
  key: string;
  /**
   * Sets whether the user is allowed to skip this screen.
   * @default false
   */
  isSkippable?: boolean;
}

export const ONBOARDING_SCREENS: OnboardingScreen[] = [
  {
    component: OnboardingStart,
    key: "start",
  },
  {
    component: OnboardingPrivateKey,
    key: "private-key",
  },
  {
    component: OnboardingDone,
    key: "done",
  },
];

export default function OnboardingRoot() {
  let [pageIndex, setPageIndex] = useState(0);

  const renderPage = (pageIndex: number) => {
    switch (pageIndex) {
      case 0:
        return <OnboardingStart />;
      case 1:
        return <OnboardingPrivateKey incrementPage={() => setPageIndex(2)} />;
      case 2:
        return <OnboardingDone />;
      default:
        return <Navigate to="overview" />;
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" minHeight="100vh">
        <Stack width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="85vh"
          >
            {renderPage(pageIndex)}
          </Box>
          <Stack display="flex" gap={4} alignItems="center">
            {pageIndex == 0 ? (
              <Button
                variant="contained"
                onClick={() => {
                  setPageIndex(1);
                }}
                size="large"
                style={{
                  background: "#4992FF",
                  fontFamily: "Rubik",
                  borderRadius: "15px",
                }}
              >
                Get Started
              </Button>
            ) : null}
            <OnboardingProgress pageIndex={pageIndex} />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
