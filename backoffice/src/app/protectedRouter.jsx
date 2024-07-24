/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useContext(UserContext);
  if (!isAuthenticated && user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return (
    <main className="min-h-[calc(100vh-(64px+84px+80px))]">{children}</main>
  );
}

export default ProtectedRoute;
