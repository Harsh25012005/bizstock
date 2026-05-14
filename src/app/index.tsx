import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";

import { AUTH_HOME_ROUTE, ONBOARDING_ROUTE, PROTECTED_HOME_ROUTE, bizstockLogo } from "@/constants";
import { useTheme } from "@/hooks";
import { useAuthStore } from "@/store";

export default function IndexScreen() {
  const session = useAuthStore((state) => state.session);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRedirect(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  if (shouldRedirect) {
    return <Redirect href={session ? PROTECTED_HOME_ROUTE : ONBOARDING_ROUTE} />;
  }

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
      <Image source={bizstockLogo} resizeMode="contain" style={{ width: 220, height: 220 }} />
    </View>
  );
}
