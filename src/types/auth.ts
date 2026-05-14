import type { FirebaseAuthSession, FirebaseAuthUser, PendingOtpVerification } from "@/firebase";
import type { BUSINESS_CATEGORIES } from "@/constants";

export type AuthStatus = "anonymous" | "authenticating" | "authenticated";
export type AuthMethod = "email" | "phone";
export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

export interface AuthStoreState {
  status: AuthStatus;
  session: FirebaseAuthSession | null;
  user: FirebaseAuthUser | null;
  pendingVerification: PendingOtpVerification | null;
  hasHydrated: boolean;
  isAuthReady: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  authMethod: AuthMethod;
  rememberMe: boolean;
  initialize: () => () => void;
  setAuthMethod: (authMethod: AuthMethod) => void;
  setRememberMe: (rememberMe: boolean) => void;
  signInWithEmail: (payload: { email: string; password: string }) => Promise<FirebaseAuthSession | null>;
  signUpWithEmail: (payload: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => Promise<FirebaseAuthSession | null>;
  requestOtp: (phoneNumber: string, appVerifier?: unknown) => Promise<PendingOtpVerification>;
  verifyPendingOtp: (otp: string) => Promise<FirebaseAuthSession | null>;
  forgotPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<FirebaseAuthSession | null>;
  saveBusinessProfile: (payload: {
    businessName: string;
    ownerName: string;
    gstNumber?: string;
    businessAddress: string;
    category: BusinessCategory;
  }) => Promise<string>;
  logout: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  markHydrated: () => void;
  markAuthReady: () => void;
  reset: () => void;
}
