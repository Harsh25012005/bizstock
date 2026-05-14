import { useEffect } from "react";

import { syncEngine } from "@/services";
import { useAppStore, useAuthStore } from "@/store";

export const useBootstrap = () => {
  const authHydrated = useAuthStore((state) => state.hasHydrated);
  const authReady = useAuthStore((state) => state.isAuthReady);
  const initializeAuth = useAuthStore((state) => state.initialize);
  const appHydrated = useAppStore((state) => state.hasHydrated);
  const isBootstrapped = useAppStore((state) => state.isBootstrapped);
  const setBootstrapped = useAppStore((state) => state.setBootstrapped);

  useEffect(() => {
    return initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!authHydrated || !authReady || !appHydrated || isBootstrapped) {
      return;
    }

    void syncEngine.bootstrap().finally(() => {
      setBootstrapped(true);
    });
  }, [appHydrated, authHydrated, authReady, isBootstrapped, setBootstrapped]);

  return {
    isReady: authHydrated && authReady && appHydrated && isBootstrapped,
  };
};
