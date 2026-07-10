import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return user?.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/home" replace state={{ from: location }} />
  );
}
