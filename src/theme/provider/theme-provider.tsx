import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

import { useAppStore } from "@/store";
import { radius } from "@/theme/radius";
import { shadows } from "@/theme/shadows";
import { spacing } from "@/theme/spacing";
import { fontFamily, fontSize, fontWeight, lineHeight } from "@/theme/typography";
import { darkTheme, lightTheme } from "@/theme/themes";
import type { ResolvedThemeMode, ThemeContextValue } from "@/types";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const resolveMode = (mode: ThemeContextValue["mode"], systemScheme: ColorSchemeName): ResolvedThemeMode => {
  if (mode === "system") {
    return systemScheme === "dark" ? "dark" : "light";
  }

  return mode;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const mode = useAppStore((state) => state.themeMode);
  const setMode = useAppStore((state) => state.setThemeMode);
  const systemScheme = useColorScheme();

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedMode = resolveMode(mode, systemScheme);
    const activeTheme = resolvedMode === "dark" ? darkTheme : lightTheme;

    return {
      mode,
      resolvedMode,
      isDark: resolvedMode === "dark",
      setMode,
      theme: activeTheme,
      colors: activeTheme.colors,
      spacing,
      radius,
      shadows,
      typography: {
        fontFamily,
        fontSize,
        lineHeight,
        fontWeight,
      },
    };
  }, [mode, setMode, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
