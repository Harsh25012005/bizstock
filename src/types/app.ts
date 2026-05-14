export type AppThemeMode = "light" | "dark" | "system";

export interface AppStoreState {
  themeMode: AppThemeMode;
  hasHydrated: boolean;
  isBootstrapped: boolean;
  setThemeMode: (mode: AppThemeMode) => void;
  setBootstrapped: (value: boolean) => void;
  markHydrated: () => void;
}
