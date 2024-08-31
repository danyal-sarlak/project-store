/* 
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./Components/Home";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";

const Routes = () => {
  let routeList = useRoutes([
    {
      path: "/login",
     lazy:()=>import("./pages/Login")
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
      element: <Page404/>,
    },
   
  ]);

  return <>{routeList}</>;
};

export default Routes;

 */
import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";

import Home from "./Components/Home";
import Page404 from "./pages/Page404";

// استفاده از lazy برای لود کامپوننت Login
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));

const Routes = () => {
  let routeList = useRoutes([
    {
      path: "/login",
      element: (
        <Suspense
          fallback={<div className="flex items-center h-screen justify-center">loading...</div>}
        >
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense
          fallback={<div className="flex items-center h-screen justify-center">loading...</div>}
        >
          <SignUp />
        </Suspense>
      ),
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

/* import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";

import Home from "./Components/Home";
import Page404 from "./pages/Page404";

// استفاده از lazy برای لود کامپوننت Login
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));

const Routes = () => {
  let routeList = useRoutes([
    {
      path: "/login",
      element: ( <Login />),
    },
    {
      path: "/signup",
      element:  <SignUp /> ,
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
 */