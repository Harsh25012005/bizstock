import { useAuthStore } from "@/store";

export const useAuthGuard = () => {
  const session = useAuthStore((state) => state.session);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  return {
    isAuthenticated: Boolean(session),
    isReady: hasHydrated,
    session,
  };
};
