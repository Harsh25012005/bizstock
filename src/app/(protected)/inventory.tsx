import { Text, View } from "react-native";

import { EmptyState, PlaceholderCard, ScreenWrapper } from "@/components";

export default function InventoryScreen() {
  return (
    <ScreenWrapper
      title="Inventory"
      subtitle="Stock visibility module shell for warehouse-ready scaling and low-latency lookups."
    >
      <View className="gap-4">
        <PlaceholderCard title="Inventory architecture">
          <Text className="text-base leading-6 text-ink-600">
            Reserve this feature boundary for stock snapshots, batch sync jobs, and reconciliation tools.
          </Text>
        </PlaceholderCard>
        <EmptyState
          title="Inventory screens not implemented"
          description="Only the foundation exists here so domain logic can be introduced incrementally."
        />
      </View>
    </ScreenWrapper>
  );
}
