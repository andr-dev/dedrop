import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AppLayout } from './AppLayout';
import screens from './screens';
import NotFound from './screens/NotFound';
import OnboardingRoot, { ONBOARDING_SCREENS } from './screens/onboarding';

export function AppRouter() {
    const theme = useTheme();

    useEffect(() => { document.body.style.backgroundColor = theme.colors.primaryDark }, [])

    return (
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
    );
}