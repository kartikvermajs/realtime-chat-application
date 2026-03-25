import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="p-4 relative bg-sky-500">
      <input
        type="text"
        placeholder="Search conversations"
        className="w-full text-sm bg-sky-500 text-white placeholder-blue-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <Search className="absolute size-[17px] text-blue-200 left-[30px] top-[50%] -translate-y-[50%]" />
    </div>
  );
};

export default SearchBar;
