import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
