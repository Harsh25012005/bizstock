import { palette } from "@/theme/colors";
import type { AppTheme } from "@/types";

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#0F0F0F",
    surface: "#17171A",
    card: "#1D1D21",
    primary: palette.orange[500],
    primaryMuted: "rgba(249, 115, 22, 0.18)",
    text: "#FAFAFB",
    textInverse: palette.white,
    textSecondary: "#B3B4BD",
    border: "#2A2A30",
    success: palette.emerald[500],
    warning: palette.amber[500],
    danger: palette.red[500],
    info: palette.sky[500],
    overlay: "rgba(9, 9, 11, 0.78)",
    disabled: "#3B3B43",
    placeholder: "#6D6D75",
  },
};
