import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ContactsIcon from "@mui/icons-material/Contacts";
import SendIcon from "@mui/icons-material/Send";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import Logo from "./assets/logo.svg";

interface SideBarProps {
  label: string;
  icon: ReactNode;
}

function SideBarItem(props: SideBarProps) {
  let navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      <ButtonBase
        sx={{ width: "100%", height: 96 }}
        onClick={() => navigate(props.label.toLocaleLowerCase())}
      >
        <Stack justifyContent="center" alignItems="center" gap={1}>
          {props.icon}
          <Typography variant="subtitle2">{props.label}</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  );
}

function SideBar() {

  return (
    <Box width="100%" height="100%">
      <Box
        height="100%"
        sx={{
          backgroundColor: "#222B3A",
          borderRadius: "20px",
        }}
        role="presentation"
      >
        <Stack>
          <img style={{ margin: 16, marginTop: 8 }} src={Logo} />
          <SideBarItem label="Login" icon={<SendIcon />} />
          <SideBarItem label="Send" icon={<SendIcon />} />
          <SideBarItem label="Receive" icon={<SystemUpdateAltIcon />} />
          <SideBarItem label="Contacts" icon={<ContactsIcon />} />
        </Stack>
      </Box>
    </Box>
  );
}

export function AppLayout() {
  // const loader = <Loader />;

  return (
    // <React.Suspense fallback={loader}>
    <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            minWidth: 96,
            height: "100%",
            padding: 20,
            paddingRight: 0,
          }}
        >
          <SideBar />
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Outlet />
        </div>
      </div>
    </Suspense>
    // </React.Suspense>
  );
}
