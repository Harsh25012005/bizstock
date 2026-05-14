import { Animated, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { loaderSizes, loaderTimings } from "@/components/ui/loader/loader.styles";
import { useLoaderRotation } from "@/components/ui/loader/hooks";
import { useTheme } from "@/hooks";

export interface InlineLoaderProps {
  label?: string;
}

export const InlineLoader = ({ label }: InlineLoaderProps) => {
  const { colors } = useTheme();
  const rotation = useLoaderRotation(loaderTimings.rotate);
  const ringStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View className="flex-row items-center gap-3 py-2">
      <Animated.View
        style={[
          {
            width: loaderSizes.inlineRing,
            height: loaderSizes.inlineRing,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: colors.primaryMuted,
            borderTopColor: colors.primary,
          },
          ringStyle,
        ]}
      />
      {label ? (
        <Text size="sm" weight="medium" tone="secondary">
          {label}
        </Text>
      ) : null}
    </View>
  );
};
