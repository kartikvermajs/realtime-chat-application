import Conversations from "./Conversations";
import Header from "./Header";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      <Header />
      <SearchBar />
      <Conversations />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
