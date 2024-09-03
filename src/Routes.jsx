
import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";

import Home from "./Components/Home";
import Page404 from "./pages/Page404";
import Loading from "./Components/Loading";
import SignUp from "./pages/SignUp";
// استفاده از lazy برای لود کامپوننت Login
const Login = React.lazy(() => import("./pages/Login"));


const Routes = () => {
  let routeList = useRoutes([
    {
      path: "/login",
      element: (
        <Suspense
          fallback={<div className="flex items-center h-screen justify-center"><Loading/></div>}
        >
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Home />,
      index: true,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return <>{routeList}</>;
};

export default Routes;

