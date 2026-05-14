import { Text, View } from "react-native";

import { EmptyState, PlaceholderCard, ScreenWrapper } from "@/components";

export default function DashboardScreen() {
  return (
    <ScreenWrapper
      title="Dashboard"
      subtitle="Executive overview module shell prepared for scalable analytics and cached summaries."
    >
      <View className="gap-4">
        <PlaceholderCard title="Foundation health" subtitle="App shell status">
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-2xl bg-brand-50 p-4">
              <Text className="text-sm text-ink-500">Routing</Text>
              <Text className="mt-2 text-xl font-semibold text-ink-900">Ready</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-emerald-50 p-4">
              <Text className="text-sm text-ink-500">Offline Prep</Text>
              <Text className="mt-2 text-xl font-semibold text-ink-900">Queued</Text>
            </View>
          </View>
        </PlaceholderCard>
        <EmptyState
          title="Dashboard widgets come later"
          description="KPIs, top SKUs, dues, and alerts can plug into this screen without changing the navigation or provider layers."
        />
      </View>
    </ScreenWrapper>
  );
}
