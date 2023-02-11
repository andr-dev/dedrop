import React from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    // const loader = <Loader />;

    return (
        // <React.Suspense fallback={loader}>
        <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
            <Outlet />
        </Suspense>
        // </React.Suspense>
    );
}

