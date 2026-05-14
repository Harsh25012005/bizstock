import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants";
import { zustandStorage } from "@/services/storage";
import type { AppStoreState } from "@/types";

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      themeMode: "light",
      hasSeenOnboarding: false,
      hasHydrated: false,
      isBootstrapped: false,
      setThemeMode: (mode) => set({ themeMode: mode }),
      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
      setBootstrapped: (value) => set({ isBootstrapped: value }),
      markHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: STORAGE_KEYS.app,
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      migrate: (persistedState) => {
        const state = (persistedState as Partial<AppStoreState> | undefined) ?? {};

        return {
          ...state,
          themeMode: "light" as const,
          hasSeenOnboarding: state.hasSeenOnboarding ?? false,
        };
      },
      partialize: (state) => ({
        themeMode: state.themeMode,
        hasSeenOnboarding: state.hasSeenOnboarding,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
