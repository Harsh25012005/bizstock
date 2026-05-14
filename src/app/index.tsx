import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { ScreenWrapper } from "@/components";
import { AUTH_HOME_ROUTE, PROTECTED_HOME_ROUTE } from "@/constants";
import { useAuthStore } from "@/store";

export default function IndexScreen() {
  const session = useAuthStore((state) => state.session);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRedirect(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  if (shouldRedirect) {
    return <Redirect href={session ? PROTECTED_HOME_ROUTE : AUTH_HOME_ROUTE} />;
  }

  return (
    <ScreenWrapper
      scrollable={false}
      title="BizStock"
      subtitle="Scalable mobile foundation for fast-moving distribution teams."
    >
      <View className="flex-1 justify-center">
        <View className="rounded-[28px] bg-white p-6 shadow-card">
          <Text className="text-sm uppercase tracking-[2px] text-brand-600">Splash</Text>
          <Text className="mt-3 text-2xl font-semibold text-ink-900">
            Preparing the offline-first shell
          </Text>
          <Text className="mt-3 text-base leading-6 text-ink-600">
            Providers, routing guards, persisted state, Firebase bootstrap, and scalable modules
            are being initialized.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
