import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // If no token or user is not admin, redirect to not found
  return token && user.role === "admin" ? <Outlet /> : <Navigate to="/notfound" />;
};

export default AdminRoute;
