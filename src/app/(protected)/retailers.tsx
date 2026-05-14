import { Text, View } from "react-native";

import { EmptyState, PlaceholderCard, ScreenWrapper } from "@/components";

export default function RetailersScreen() {
  return (
    <ScreenWrapper
      title="Retailers"
      subtitle="Feature module boundary prepared for customer profiles, segmentation, and order history."
    >
      <View className="gap-4">
        <PlaceholderCard title="Retail network module">
          <Text className="text-base leading-6 text-ink-600">
            Keep retailers isolated as their own feature package so profile queries, ledger summaries,
            and notes can scale without bloating the rest of the app.
          </Text>
        </PlaceholderCard>
        <EmptyState
          title="Retailer list pending"
          description="Future screens can connect paginated queries, local caching, and optimistic updates here."
        />
      </View>
    </ScreenWrapper>
  );
}
