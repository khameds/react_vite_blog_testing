/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./components/layout/layout.jsx";
import Team from "./components/team.jsx";
import "./index.css";

function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "team", element: <Team /> },
      // { path: "contact", element: <Contact /> },
      // { path: "workshops", element: <Workshop /> },
      // { path: "signup", element: <Signup /> },
      // { path: "login", element: <Login /> },
      // { path: "/giveaway", element: <Giveaway /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);