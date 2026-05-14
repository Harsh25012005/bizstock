import { useEffect } from "react";

import { syncEngine } from "@/services";
import { useAppStore, useAuthStore } from "@/store";

export const useBootstrap = () => {
  const authHydrated = useAuthStore((state) => state.hasHydrated);
  const appHydrated = useAppStore((state) => state.hasHydrated);
  const isBootstrapped = useAppStore((state) => state.isBootstrapped);
  const setBootstrapped = useAppStore((state) => state.setBootstrapped);

  useEffect(() => {
    if (!authHydrated || !appHydrated || isBootstrapped) {
      return;
    }

    void syncEngine.bootstrap().finally(() => {
      setBootstrapped(true);
    });
  }, [appHydrated, authHydrated, isBootstrapped, setBootstrapped]);

  return {
    isReady: authHydrated && appHydrated && isBootstrapped,
  };
};
