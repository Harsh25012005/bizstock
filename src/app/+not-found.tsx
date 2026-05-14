import { router } from "expo-router";
import { View } from "react-native";

import { Button, EmptyState, ScreenWrapper } from "@/components";

export default function NotFoundScreen() {
  return (
    <ScreenWrapper scrollable={false}>
      <View className="flex-1 justify-center gap-5">
        <EmptyState
          title="Screen not found"
          description="The route exists outside the current BizStock shell. Use the button below to return safely."
        />
        <Button label="Go to dashboard" onPress={() => router.replace("/(protected)/dashboard")} />
      </View>
    </ScreenWrapper>
  );
}
