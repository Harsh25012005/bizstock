import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";
import type { BusinessCategory } from "@/types";

export interface BusinessCategoryCardProps {
  category: BusinessCategory;
  selected: boolean;
  onPress: (category: BusinessCategory) => void;
}

export const BusinessCategoryCard = ({ category, selected, onPress }: BusinessCategoryCardProps) => {
  const { colors, isDark, radius } = useTheme();

  return (
    <Pressable
      className="min-h-20 flex-1 justify-between border p-4"
      onPress={() => onPress(category)}
      style={{
        borderRadius: radius.xl,
        backgroundColor: selected ? colors.primary : isDark ? "#17171A" : "#F8F8FA",
        borderColor: selected ? colors.primary : colors.border,
      }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          borderWidth: 2,
          borderColor: selected ? colors.textInverse : colors.border,
          backgroundColor: selected ? colors.textInverse : "transparent",
        }}
      />
      <Text weight="semibold" tone={selected ? "inverse" : "primary"}>
        {category}
      </Text>
    </Pressable>
  );
};
