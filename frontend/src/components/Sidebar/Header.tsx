import { Contact, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="p-4 bg-sky-500 text-white flex items-center justify-between">
      <h1 className="text-xl font-bold">Messages</h1>
      <div className="flex space-x-3">
        <button className="p-2 rounded-full cursor-pointer">
          <Contact className="size-4" />
        </button>
        <button className="p-2 rounded-full cursor-pointer">
          <Settings className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Header;
