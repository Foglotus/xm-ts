import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MyLayout from "./layout";
import HomePage from "./views/home/Home";
import LoginPage from "./views/login/Login";
import AccountPage from "./views/account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
);
