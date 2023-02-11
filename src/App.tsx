import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import screens from './screens';
import NotFound from './screens/NotFound';
import OnboardingRoot, { ONBOARDING_SCREENS } from './screens/onboarding';
import { appReducer, AppContext, INITIAL_APP_STATE, appContext } from "./context";
import React, { useContext, useEffect, useState } from 'react';
import StreamrClient from 'streamr-client';
import { invoke } from '@tauri-apps/api';
import { Loader } from './components/loader';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    const [state, dispatch] = React.useReducer(appReducer, INITIAL_APP_STATE);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <appContext.Provider value={{ state, dispatch }}>
                <AppWrapper />
            </appContext.Provider>
        </ThemeProvider>
    );
}

function AppWrapper() {
    let [loaded, setLoaded] = useState(false);
    let context = useContext(appContext);

    useEffect(() => {
        invoke("get_private_key").then((private_key) => {
            let streamrClient = new StreamrClient({
                auth: {
                    privateKey: private_key as string
                }
            })

            context.dispatch({ type: "SetStreamrClient", payload: streamrClient })
            setLoaded(true);
        });
    }, [])

    if (!loaded) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="onboarding" element={<OnboardingRoot />}>
                    <Route index element={<Navigate to="start" />} />

                    {ONBOARDING_SCREENS.map(({ key, component: ScreenComponent }, index) => (
                        <Route key={key} path={key} element={<ScreenComponent />} />
                    ))}
                </Route>

                <Route element={<AppLayout />}>
                    {screens}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>);
}