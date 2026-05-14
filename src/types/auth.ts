import type { FirebaseAuthSession, FirebaseAuthUser, PendingOtpVerification } from "@/firebase";

export type AuthStatus = "anonymous" | "authenticating" | "authenticated";

export interface AuthStoreState {
  status: AuthStatus;
  session: FirebaseAuthSession | null;
  user: FirebaseAuthUser | null;
  pendingVerification: PendingOtpVerification | null;
  hasHydrated: boolean;
  isAuthReady: boolean;
  isLoading: boolean;
  initialize: () => () => void;
  requestOtp: (phoneNumber: string, appVerifier?: unknown) => Promise<PendingOtpVerification>;
  verifyPendingOtp: (otp: string) => Promise<FirebaseAuthSession | null>;
  logout: () => Promise<void>;
  setSession: (session: FirebaseAuthSession | null) => void;
  setUser: (user: FirebaseAuthUser | null) => void;
  setPendingVerification: (pendingVerification: PendingOtpVerification | null) => void;
  setLoading: (isLoading: boolean) => void;
  markHydrated: () => void;
  markAuthReady: () => void;
  reset: () => void;
}
