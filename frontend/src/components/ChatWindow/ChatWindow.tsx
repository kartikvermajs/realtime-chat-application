import ChatPlaceholder from "./ChatPlaceholder";

const ChatWindow: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between">
      <ChatPlaceholder />
    </div>
  );
};

export default ChatWindow;
