import { Animated, View } from "react-native";

import { useTheme } from "@/hooks";

export interface PaginationDotsProps {
  count: number;
  progress: Animated.Value;
}

export const PaginationDots = ({ count, progress }: PaginationDotsProps) => {
  const { colors, isDark } = useTheme();

  return (
    <View className="flex-row items-center gap-2">
      {Array.from({ length: count }).map((_, index) => {
        const width = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [10, 26, 10],
          extrapolate: "clamp",
        });

        const opacity = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.55, 1, 0.55],
          extrapolate: "clamp",
        });

        const backgroundColor = progress.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [isDark ? "#3F3F46" : "#D4D4D8", colors.primary, isDark ? "#3F3F46" : "#D4D4D8"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={{
              width,
              height: 10,
              opacity,
              borderRadius: 999,
              backgroundColor,
            }}
          />
        );
      })}
    </View>
  );
};
