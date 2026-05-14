import { Redirect, Stack } from "expo-router";

import { FullScreenLoader } from "@/components";
import { PROTECTED_HOME_ROUTE } from "@/constants";
import { useAuthGuard } from "@/hooks";

export default function AuthLayout() {
  const { isAuthenticated, isReady } = useAuthGuard();

  if (!isReady) {
    return <FullScreenLoader label="Restoring authentication state..." />;
  }

  if (isAuthenticated) {
    return <Redirect href={PROTECTED_HOME_ROUTE} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
