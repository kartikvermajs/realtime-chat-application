import { MessageCircle } from "lucide-react";

const ChatPlaceholder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-gray-500">
      <MessageCircle className="size-16 mb-4 opacity-70" />
      <h2 className="text-lg font-semibold">Welcome to Chat</h2>
      <p className="text-sm mt-2">
        Select a freind form you list to start chatting.
      </p>
    </div>
  );
};

export default ChatPlaceholder;
