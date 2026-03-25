import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const logoutUser = async () => {
    await authService.logout();
    logout();
    await queryClient.removeQueries({ queryKey: ["auth"] });

    return navigate("/auth");
  };

  return (
    <div className="p-4 border-t border-gray-200 flex item-center space-x-3">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName ?? "User")}&background=0ea5e9&color=fff&rounded=true`}
        alt="User"
        className="size-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold truncate text-sm">
          {user?.username} ({user?.connectCode})
        </h2>
        <p className="text-xs text-gray-500">Online</p>
      </div>
      <button
        onClick={() => logoutUser()}
        className="text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <LogOut className="size-[16px]" />
      </button>
    </div>
  );
};

export default UserProfile;
