import { palette } from "@/theme/colors";
import type { AppTheme } from "@/types";

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: palette.zinc[50],
    surface: palette.white,
    card: palette.white,
    primary: palette.orange[500],
    primaryMuted: palette.orange[100],
    text: palette.zinc[900],
    textInverse: palette.white,
    textSecondary: palette.zinc[600],
    border: palette.zinc[200],
    success: palette.emerald[600],
    warning: palette.amber[600],
    danger: palette.red[600],
    info: palette.sky[600],
    overlay: "rgba(9, 9, 11, 0.48)",
    disabled: palette.zinc[300],
    placeholder: palette.zinc[400],
  },
};
