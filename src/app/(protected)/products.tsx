import { Text, View } from "react-native";

import { AppFlashList, PlaceholderCard, ScreenWrapper } from "@/components";

const productPlaceholders = [
  "Catalog browser shell",
  "Large-list FlashList foundation",
  "Future search and filter module",
];

export default function ProductsScreen() {
  return (
    <ScreenWrapper
      title="Products"
      subtitle="Optimized for large product catalogs and low-end Android scrolling performance."
    >
      <PlaceholderCard title="Catalog foundation" subtitle="FlashList-ready module structure">
        <View style={{ height: 220 }}>
          <AppFlashList
            data={productPlaceholders}
            renderItem={({ item }) => (
              <View className="mb-3 rounded-2xl border border-ink-200 bg-ink-50 px-4 py-4">
                <Text className="text-base font-medium text-ink-800">{item}</Text>
              </View>
            )}
          />
        </View>
      </PlaceholderCard>
    </ScreenWrapper>
  );
}
