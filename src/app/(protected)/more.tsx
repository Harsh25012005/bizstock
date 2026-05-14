import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { Button, PlaceholderCard, ScreenWrapper } from "@/components";
import { FIREBASE_TEST_ROUTE } from "@/constants";
import { useToast } from "@/hooks";
import { useAuthStore } from "@/store";

export default function MoreScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { show } = useToast();

  return (
    <ScreenWrapper
      title="More"
      subtitle="Settings, profile, staff tools, and support utilities can expand here as separate modules."
    >
      <View className="gap-4">
        <PlaceholderCard title="Account shell">
          <Text className="text-base leading-6 text-ink-600">
            This route is a safe home for account preferences, team management, app diagnostics, and
            sync status panels.
          </Text>
          <View className="mt-5">
            <Button
              label="Sign out"
              variant="secondary"
              onPress={async () => {
                await logout();
                show({
                  title: "Signed out",
                  description: "Firebase auth state and the local session store were cleared.",
                  variant: "info",
                });
              }}
            />
            <View className="mt-3">
              <Button
                label="Open Firestore test screen"
                variant="ghost"
                onPress={() => router.push(FIREBASE_TEST_ROUTE)}
              />
            </View>
          </View>
        </PlaceholderCard>
      </View>
    </ScreenWrapper>
  );
}
