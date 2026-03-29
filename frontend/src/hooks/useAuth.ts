import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["auth"],
    queryFn: authService.me,
    enabled: isAuthenticated,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
