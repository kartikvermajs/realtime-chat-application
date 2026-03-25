import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";

export function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: authService.me,
    retry: false,
  });
}
