/* eslint-disable react-refresh/only-export-components */
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from "./app/App.jsx";
import ProtectedRoute from "./app/protectedRouter.jsx";
import PublicRoute from "./app/publicRoute.jsx";
import Layout from "./components/layout/layout.jsx";
import Login from "./components/login.jsx";
import NotFound from "./components/notFound.jsx";
import Signup from "./components/signup.jsx";
import { UserContext, UserProvider } from "./context/userContext.jsx";
import "./index.css";
import Articles from "./pages/articles.jsx";
import Profile from "./pages/profile.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import Team from "./pages/team.jsx";

function AppLayout() {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <Layout>
      <Outlet context={{ isAuthenticated }} />
    </Layout>
  );
}

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <App /> },
          { path: "equipe", element: <Team /> },
          { path: "creation-utilisateur", element: <Signup /> },
          { path: "gestion-articles", element: <Articles /> },
          { path: "profile", element: <Profile /> },
          { path: "initialisation-mot-de-passe", element: <ResetPassword /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
