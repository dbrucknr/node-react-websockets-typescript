import { Navigate, Outlet } from "react-router-dom";

export const ProtectedPage = () => {
  const authorized = true;
  return authorized ? <Outlet /> : <Navigate to="/login" />;
};
