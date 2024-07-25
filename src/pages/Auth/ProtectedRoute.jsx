import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  const refresh_token = Cookies.get("refresh_token");

  if (!token && !refresh_token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
