import { useAuthStore } from "@/store";

export const useAuthGuard = () => {
  const session = useAuthStore((state) => state.session);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  return {
    isAuthenticated: Boolean(session),
    isReady: hasHydrated && isAuthReady,
    session,
  };
};
