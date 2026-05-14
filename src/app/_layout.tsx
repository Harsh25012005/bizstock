import "../../global.css";

import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";

import { Button, Heading, Screen, StartupLoader, Text } from "@/components";
import { useBootstrap, useTheme } from "@/hooks";
import { AppProviders } from "@/providers";

function AppBootstrap({ children }: { children: ReactNode }) {
  const { isReady } = useBootstrap();

  if (!isReady) {
    return <StartupLoader label="Preparing BizStock design system..." />;
  }

  return <>{children}</>;
}

function ThemedStatusBar() {
  const { isDark } = useTheme();

  return <StatusBar style={isDark ? "light" : "dark"} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <AppProviders>
        <StartupLoader label="Loading BizStock interface..." />
      </AppProviders>
    );
  }

  return (
    <AppProviders>
      <ThemedStatusBar />
      <AppBootstrap>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </AppBootstrap>
    </AppProviders>
  );
}

export function ErrorBoundary() {
  return (
    <Screen scrollable={false}>
      <Heading level={2}>Something went wrong</Heading>
      <Text tone="secondary">
        The UI foundation hit an unexpected error. Reload once and continue working from the shell.
      </Text>
      <Button label="Dismiss" onPress={() => undefined} />
    </Screen>
  );
}
