import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import screens from './screens';
import NotFound from './screens/NotFound';
import OnboardingRoot, { ONBOARDING_SCREENS } from './screens/onboarding';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
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
            </BrowserRouter>
        </ThemeProvider>
    );
}