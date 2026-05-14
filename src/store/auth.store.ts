import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants";
import { logout, sendOTP, subscribeToAuthChanges, verifyOTP } from "@/firebase";
import { zustandStorage } from "@/services/storage";
import type { AuthStoreState } from "@/types";

const initialState = {
  status: "anonymous" as const,
  session: null,
  user: null,
  pendingVerification: null,
  hasHydrated: false,
  isAuthReady: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      initialize: () => {
        const unsubscribe = subscribeToAuthChanges(({ session, user }) => {
          set((state) => ({
            session,
            user,
            status: session ? "authenticated" : state.pendingVerification ? "authenticating" : "anonymous",
            isAuthReady: true,
            isLoading: false,
          }));
        });

        return unsubscribe;
      },
      requestOtp: async (phoneNumber, appVerifier) => {
        set({ isLoading: true, status: "authenticating" });

        try {
          const result = await sendOTP({
            phoneNumber,
            appVerifier,
          });
          const pendingVerification = {
            ...result,
            requestedAt: Date.now(),
            mode: result.verificationId === "bizstock-mock-verification" ? ("mock" as const) : ("firebase" as const),
          };

          set({
            pendingVerification,
            isLoading: false,
            status: "authenticating",
          });

          return pendingVerification;
        } catch (error) {
          set({ isLoading: false, status: "anonymous" });
          throw error;
        }
      },
      verifyPendingOtp: async (otp) => {
        const pendingVerification = useAuthStore.getState().pendingVerification;

        if (!pendingVerification) {
          throw new Error("Request an OTP before attempting verification.");
        }

        set({ isLoading: true });

        try {
          const result = await verifyOTP(pendingVerification.verificationId, otp);

          set({
            session: result.session,
            user: result.user,
            pendingVerification: null,
            status: "authenticated",
            isLoading: false,
          });

          return result.session;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });

        try {
          await logout();
        } finally {
          set({
            ...initialState,
            hasHydrated: true,
            isAuthReady: true,
          });
        }
      },
      setSession: (session) =>
        set({
          session,
          user: session
            ? {
                uid: session.userId,
                phoneNumber: session.phoneNumber,
                displayName: session.displayName,
              }
            : null,
          pendingVerification: null,
          status: session ? "authenticated" : "anonymous",
        }),
      setUser: (user) => set({ user }),
      setPendingVerification: (pendingVerification) =>
        set({
          pendingVerification,
          status: pendingVerification ? "authenticating" : "anonymous",
        }),
      setLoading: (isLoading) => set({ isLoading }),
      markHydrated: () => set({ hasHydrated: true }),
      markAuthReady: () => set({ isAuthReady: true }),
      reset: () =>
        set({
          session: null,
          user: null,
          pendingVerification: null,
          status: "anonymous",
          hasHydrated: true,
          isAuthReady: true,
          isLoading: false,
        }),
    }),
    {
      name: STORAGE_KEYS.auth,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        pendingVerification: state.pendingVerification,
        status: state.status,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
