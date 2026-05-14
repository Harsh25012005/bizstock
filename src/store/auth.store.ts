import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants";
import { zustandStorage } from "@/services/storage";
import type { AuthStoreState } from "@/types";

const initialState = {
  status: "anonymous" as const,
  session: null,
  hasHydrated: false,
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (session) =>
        set({
          session,
          status: session ? "authenticated" : "anonymous",
        }),
      markHydrated: () => set({ hasHydrated: true }),
      reset: () =>
        set({
          session: null,
          status: "anonymous",
          hasHydrated: true,
        }),
    }),
    {
      name: STORAGE_KEYS.auth,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        session: state.session,
        status: state.status,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
