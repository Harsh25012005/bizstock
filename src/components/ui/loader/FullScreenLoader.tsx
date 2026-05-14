import { Animated, View } from "react-native";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { loaderSizes, loaderTimings } from "@/components/ui/loader/loader.styles";
import { useLoaderLoop, useLoaderRotation } from "@/components/ui/loader/hooks";
import { useTheme } from "@/hooks";

export interface FullScreenLoaderProps {
  label?: string;
  title?: string;
}

export const FullScreenLoader = ({
  label = "Syncing your operational workspace...",
  title = "Loading BizStock",
}: FullScreenLoaderProps) => {
  const { colors } = useTheme();
  const rotation = useLoaderRotation(loaderTimings.rotate);
  const pulse = useLoaderLoop(0, 1, loaderTimings.pulse);
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
  const dotStyle = {
    opacity: pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.45, 1],
    }),
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [0.92, 1.08],
        }),
      },
    ],
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="w-full max-w-sm items-center gap-5 py-8">
        <Animated.View
          style={[
            {
              width: loaderSizes.fullscreenRing,
              height: loaderSizes.fullscreenRing,
              borderRadius: 999,
              borderWidth: 3,
              borderColor: colors.primaryMuted,
              borderTopColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            },
            ringStyle,
          ]}
        >
          <Animated.View
            style={[
              {
                width: loaderSizes.centerDot,
                height: loaderSizes.centerDot,
                borderRadius: 999,
                backgroundColor: colors.primary,
              },
              dotStyle,
            ]}
          />
        </Animated.View>
        <View className="items-center gap-2">
          <Heading level={4}>{title}</Heading>
          <Text className="text-center" size="sm" tone="secondary">
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};
