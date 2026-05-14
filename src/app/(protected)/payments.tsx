import { Text, View } from "react-native";

import { EmptyState, PlaceholderCard, ScreenWrapper } from "@/components";

export default function PaymentsScreen() {
  return (
    <ScreenWrapper
      title="Payments"
      subtitle="Ledger and collection workflows can land here without revisiting the app shell."
    >
      <View className="gap-4">
        <PlaceholderCard title="Payments foundation">
          <Text className="text-base leading-6 text-ink-600">
            This screen is a placeholder for collection tracking, receipts, reconciliation, and credit
            status experiences.
          </Text>
        </PlaceholderCard>
        <EmptyState
          title="Payments coming later"
          description="Use this route for payment repositories, mutations, and secure transaction handling later."
        />
      </View>
    </ScreenWrapper>
  );
}
