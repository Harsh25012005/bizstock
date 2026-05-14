import { Text, View } from "react-native";

import { Button, PlaceholderCard, ScreenWrapper } from "@/components";
import { useToast } from "@/hooks";
import { useAuthStore } from "@/store";

export default function MoreScreen() {
  const reset = useAuthStore((state) => state.reset);
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
              label="Sign out placeholder"
              variant="secondary"
              onPress={() => {
                reset();
                show({
                  title: "Signed out",
                  description: "Route guards moved the session back to the auth flow.",
                  variant: "info",
                });
              }}
            />
          </View>
        </PlaceholderCard>
      </View>
    </ScreenWrapper>
  );
}
