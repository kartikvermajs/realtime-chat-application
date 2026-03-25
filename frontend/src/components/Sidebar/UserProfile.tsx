import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const UserProfile: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <div className="p-4 border-t border-gray-200 flex item-center space-x-3">
      <img
        src="https://avatar.iran.liara.run/public"
        alt="User"
        className="size-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold truncate text-sm">
          {user?.username} ({user?.connectCode})
        </h2>
        <p className="text-xs text-gray-500">Online</p>
      </div>
      <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
        <LogOut className="size-[16px]" />
      </button>
    </div>
  );
};

export default UserProfile;
