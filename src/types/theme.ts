import type { radius } from "@/theme/radius";
import type { shadows } from "@/theme/shadows";
import type { spacing } from "@/theme/spacing";
import type { fontFamily, fontSize, fontWeight, lineHeight } from "@/theme/typography";
import type { AppThemeMode } from "@/types/app";

export type ResolvedThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  primary: string;
  primaryMuted: string;
  text: string;
  textInverse: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  overlay: string;
  disabled: string;
  placeholder: string;
}

export interface AppTheme {
  mode: ResolvedThemeMode;
  colors: ThemeColors;
}

export interface ThemeContextValue {
  mode: AppThemeMode;
  resolvedMode: ResolvedThemeMode;
  isDark: boolean;
  setMode: (mode: AppThemeMode) => void;
  theme: AppTheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  typography: {
    fontFamily: typeof fontFamily;
    fontSize: typeof fontSize;
    lineHeight: typeof lineHeight;
    fontWeight: typeof fontWeight;
  };
}
