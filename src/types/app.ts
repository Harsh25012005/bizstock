export type AppThemeMode = "light" | "dark" | "system";

export interface AppStoreState {
  themeMode: AppThemeMode;
  hasSeenOnboarding: boolean;
  hasHydrated: boolean;
  isBootstrapped: boolean;
  setThemeMode: (mode: AppThemeMode) => void;
  setHasSeenOnboarding: (value: boolean) => void;
  setBootstrapped: (value: boolean) => void;
  markHydrated: () => void;
}
