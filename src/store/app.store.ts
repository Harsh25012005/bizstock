import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants";
import { zustandStorage } from "@/services/storage";
import type { AppStoreState } from "@/types";

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      themeMode: "light",
      hasHydrated: false,
      isBootstrapped: false,
      setThemeMode: (mode) => set({ themeMode: mode }),
      setBootstrapped: (value) => set({ isBootstrapped: value }),
      markHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: STORAGE_KEYS.app,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
