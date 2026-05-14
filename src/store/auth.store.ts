import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants";
import {
  createBusinessProfile,
  forgotPassword,
  logout,
  signInWithEmail,
  signInWithGoogle,
  signInWithPhone,
  signUpWithEmail,
  subscribeToSessionChanges,
  verifyOTP,
} from "@/services/auth.service";
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
  isAuthenticated: false,
  authMethod: "email" as const,
  rememberMe: true,
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,
      initialize: () => {
        const unsubscribe = subscribeToSessionChanges(({ session, user }) => {
          set((state) => ({
            session,
            user,
            isAuthenticated: Boolean(session),
            status: session ? "authenticated" : state.pendingVerification ? "authenticating" : "anonymous",
            isAuthReady: true,
            isLoading: false,
          }));
        });

        return unsubscribe;
      },
      setAuthMethod: (authMethod) => set({ authMethod }),
      setRememberMe: (rememberMe) => set({ rememberMe }),
      signInWithEmail: async ({ email, password }) => {
        set({ isLoading: true, authMethod: "email", status: "authenticating" });

        try {
          const result = await signInWithEmail({ email, password });

          set({
            session: result.session,
            user: result.user,
            isAuthenticated: Boolean(result.session),
            status: "authenticated",
            isLoading: false,
            pendingVerification: null,
          });

          return result.session;
        } catch (error) {
          set({ isLoading: false, status: "anonymous" });
          throw error;
        }
      },
      signUpWithEmail: async ({ fullName, email, phoneNumber, password }) => {
        set({ isLoading: true, authMethod: "email", status: "authenticating" });

        try {
          const result = await signUpWithEmail({
            fullName,
            email,
            phoneNumber,
            password,
          });

          set({
            session: result.session,
            user: result.user,
            isAuthenticated: Boolean(result.session),
            status: "authenticated",
            isLoading: false,
          });

          return result.session;
        } catch (error) {
          set({ isLoading: false, status: "anonymous" });
          throw error;
        }
      },
      requestOtp: async (phoneNumber, appVerifier) => {
        set({ isLoading: true, authMethod: "phone", status: "authenticating" });

        try {
          const pendingVerification = await signInWithPhone({
            phoneNumber,
            appVerifier,
          });

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
        const pendingVerification = get().pendingVerification;

        if (!pendingVerification) {
          throw new Error("Request an OTP before attempting verification.");
        }

        set({ isLoading: true, authMethod: "phone" });

        try {
          const result = await verifyOTP(pendingVerification.verificationId, otp);

          set({
            session: result.session,
            user: result.user,
            pendingVerification: null,
            isAuthenticated: Boolean(result.session),
            status: "authenticated",
            isLoading: false,
          });

          return result.session;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      forgotPassword: async (email) => {
        set({ isLoading: true });

        try {
          await forgotPassword(email);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      signInWithGoogle: async () => {
        set({ isLoading: true });

        try {
          const result = await signInWithGoogle();

          set({
            session: result,
            user: get().user,
            isAuthenticated: Boolean(result),
            status: result ? "authenticated" : "anonymous",
            isLoading: false,
          });

          return result;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      saveBusinessProfile: async (payload) => {
        set({ isLoading: true });

        try {
          const businessId = await createBusinessProfile(payload);
          const currentUser = get().user;

          set({
            isLoading: false,
            user: currentUser ? { ...currentUser, displayName: payload.ownerName } : currentUser,
          });

          return businessId;
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
      setLoading: (isLoading) => set({ isLoading }),
      markHydrated: () => set({ hasHydrated: true }),
      markAuthReady: () => set({ isAuthReady: true }),
      reset: () =>
        set({
          ...initialState,
          hasHydrated: true,
          isAuthReady: true,
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
        isAuthenticated: state.isAuthenticated,
        authMethod: state.authMethod,
        rememberMe: state.rememberMe,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
