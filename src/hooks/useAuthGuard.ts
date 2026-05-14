import { useAuthStore } from "@/store";

export const useAuthGuard = () => {
  const session = useAuthStore((state) => state.session);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  return {
    isAuthenticated,
    isReady: hasHydrated && isAuthReady,
    session,
  };
};
