import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ContactsIcon from "@mui/icons-material/Contacts";
import SendIcon from "@mui/icons-material/Send";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import Logo from "./assets/logo.png";


interface SideBarProps {
    label: string,
    icon: ReactNode,
}

function SideBarItem(props: SideBarProps) {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }} >
            <ButtonBase sx={{ width: "100%", height: 96 }}>
                <Stack justifyContent="center" alignItems="center" gap={1}>
                    {props.icon}
                    <Typography variant="subtitle2">{props.label}</Typography>
                </Stack>
            </ButtonBase>
        </Box >
    );
}

function SideBar() {
    return (
        <Box p={1} height="100%">
            <Box
                height="100%"
                sx={{
                    backgroundColor: "#222B3A",
                    borderRadius: "20px",
                }}
                role="presentation"
            >
                <Stack>
                    <img style={{ margin: 12 }} src={Logo} />
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
            <div style={{ display: "flex", flexDirection: "row", width: "100vw", height: "100vh" }}>
                <div style={{ width: 96, height: "100%" }}>
                    <SideBar />
                </div>
                <div style={{ flexGrow: 1 }}>
                    <Outlet />
                </div>
            </div>
            {/* <Grid item xs={2}>
                <SideBar></SideBar>
            </Grid>
            <Grid item xs>
                <Outlet />
            </Grid>
        </Grid> */}
        </Suspense >
        // </React.Suspense>
    );
}

