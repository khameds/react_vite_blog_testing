/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function PublicRoute({ children }) {
  const { isAuthenticated } = useContext(UserContext);
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }
  return children;
}

export default PublicRoute;
