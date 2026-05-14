export type AuthStatus = "anonymous" | "authenticated";

export interface AuthSession {
  userId: string;
  phoneNumber?: string;
}

export interface AuthStoreState {
  status: AuthStatus;
  session: AuthSession | null;
  hasHydrated: boolean;
  setSession: (session: AuthSession | null) => void;
  markHydrated: () => void;
  reset: () => void;
}
