import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import { Toaster } from "sonner";
import { GuestRoute, PrivateRoute } from "./pages/PageGuards";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const App: React.FC = () => {
  const { data } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
