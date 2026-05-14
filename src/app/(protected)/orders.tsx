import { Text, View } from "react-native";

import { EmptyState, PlaceholderCard, ScreenWrapper } from "@/components";

export default function OrdersScreen() {
  return (
    <ScreenWrapper
      title="Orders"
      subtitle="Prepared for draft orders, offline queueing, and eventual sync conflict resolution."
    >
      <View className="gap-4">
        <PlaceholderCard title="Offline-first order architecture">
          <Text className="text-base leading-6 text-ink-600">
            Order creation should eventually write to local state first, enqueue sync jobs, and reconcile
            with the backend when connectivity returns.
          </Text>
        </PlaceholderCard>
        <EmptyState
          title="No order flows yet"
          description="The module boundary and state scaffolding are ready; business workflows are intentionally deferred."
        />
      </View>
    </ScreenWrapper>
  );
}
