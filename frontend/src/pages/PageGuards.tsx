import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !user) return <Navigate to="/auth" />;

  return <Outlet />;
}

export function GuestRoute() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return !user ? <Outlet /> : <Navigate to="/" />;
}
