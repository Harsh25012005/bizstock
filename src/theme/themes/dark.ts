import { palette } from "@/theme/colors";
import type { AppTheme } from "@/types";

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: palette.zinc[950],
    surface: "#111113",
    card: "#16161A",
    primary: palette.orange[500],
    primaryMuted: "rgba(249, 115, 22, 0.16)",
    text: "#F5F5F5",
    textInverse: palette.white,
    textSecondary: palette.zinc[400],
    border: "#27272A",
    success: palette.emerald[500],
    warning: palette.amber[500],
    danger: palette.red[500],
    info: palette.sky[500],
    overlay: "rgba(9, 9, 11, 0.7)",
    disabled: palette.zinc[700],
    placeholder: palette.zinc[500],
  },
};
