import { palette } from "@/theme/colors";
import type { AppTheme } from "@/types";

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: palette.white,
    surface: "#F7F7F8",
    card: palette.white,
    primary: palette.orange[500],
    primaryMuted: "rgba(249, 115, 22, 0.10)",
    text: "#18181B",
    textInverse: palette.white,
    textSecondary: "#5F6470",
    border: "#E8E8EC",
    success: palette.emerald[600],
    warning: palette.amber[600],
    danger: palette.red[600],
    info: palette.sky[600],
    overlay: "rgba(9, 9, 11, 0.48)",
    disabled: palette.zinc[300],
    placeholder: palette.zinc[400],
  },
};
