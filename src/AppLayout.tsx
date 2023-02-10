import React from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Loader from "./components/loader";
import Flex from "./ui/flex";

export function AppLayout() {
    const loader = <Loader />;

    return (
        <React.Suspense fallback={loader}>
            <AppWindow>
                <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
                    <Outlet />
                </Suspense>
            </AppWindow>
        </React.Suspense>
    );
}

const AppWindow = styled(Flex)`
    height: 100vh;
    width: 100vw;
`;
