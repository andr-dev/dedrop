import { Navigate, Route, RouteProps } from "react-router-dom";
import Contacts from "./Contacts";
import Receive from "./Receive";
import Send from "./Send";
import ShareSettings from "./ShareSettings";

const routes: RouteProps[] = [
  {
    index: true,
    element: <Navigate to="send" relative="route" />,
  },
  { path: "send", element: <Send /> },
  { path: "receive", element: <Receive /> },
  { path: "contacts", element: <Contacts /> },
  { path: 'share-settings', element: <ShareSettings /> }
];

export default (
  <>
    {routes.map((route) => (
      <Route key={route.path ?? ""} {...route} />
    ))}
  </>
);
