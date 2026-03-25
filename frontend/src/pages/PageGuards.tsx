import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex w-full items-center justify-center">
        <div className="size-10 bg-sky-200 rounded-full animate-bounce"></div>
      </div>
    );

  if (isError || !user) return <Navigate to="/auth" />;

  return <Outlet />;
}

export function GuestRoute() {
  const { data: user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex w-full items-center justify-center">
        <div className="size-10 bg-sky-200 rounded-full animate-bounce"></div>
      </div>
    );

  return !user ? <Outlet /> : <Navigate to="/" />;
}
