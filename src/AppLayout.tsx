import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div
            // className={clsx(
            //     // App level styles
            //     'flex h-screen overflow-hidden text-ink select-none cursor-default',
            //     os === 'browser' && 'bg-app border-t border-app-line/50',
            //     os === 'macOS' && 'rounded-[10px] has-blur-effects',
            //     os !== 'browser' && os !== 'windows' && 'border border-app-frame'
            // )}
            onContextMenu={(e) => {
                // TODO: allow this on some UI text at least / disable default browser context menu
                e.preventDefault();
                return false;
            }}
        >
            <div className="relative flex w-full">
                <Suspense fallback={<div className="w-screen h-screen bg-app" />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}