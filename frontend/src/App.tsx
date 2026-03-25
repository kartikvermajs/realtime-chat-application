import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import { Toaster } from "sonner";
import { GuestRoute, PrivateRoute } from "./pages/PageGuards";

const App: React.FC = () => {
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
