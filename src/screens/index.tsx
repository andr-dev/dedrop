import { Navigate, Route, RouteProps } from 'react-router-dom';
import Overview from './Overview';
import Receive from './Receive';
import Send from './Send';

const routes: RouteProps[] = [
    {
        index: true,
        element: <Navigate to="overview" relative="route" />
    },
    { path: 'overview', element: Overview() },
    { path: 'send', element: Send() },
    { path: 'receive', element: Receive() },
];

export default (
    <>
        {routes.map((route) => (
            <Route key={route.path ?? ""} {...route} />
        ))}
    </>
);