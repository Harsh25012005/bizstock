import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";

export interface SegmentedTabsOption<T extends string> {
  key: T;
  label: string;
}

export interface SegmentedTabsProps<T extends string> {
  value: T;
  options: ReadonlyArray<SegmentedTabsOption<T>>;
  onChange: (value: T) => void;
}

export const SegmentedTabs = <T extends string>({ value, options, onChange }: SegmentedTabsProps<T>) => {
  const { colors, isDark, radius } = useTheme();

  return (
    <View
      className="flex-row p-1"
      style={{
        borderRadius: radius.full,
        backgroundColor: isDark ? "#19191D" : "#F3F4F6",
      }}
    >
      {options.map((option) => {
        const active = option.key === value;

        return (
          <Pressable
            key={option.key}
            className="flex-1 items-center justify-center py-3"
            onPress={() => onChange(option.key)}
            style={{
              borderRadius: radius.full,
              backgroundColor: active ? colors.background : "transparent",
            }}
          >
            <Text size="sm" weight="semibold" tone={active ? "primary" : "secondary"}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
