import { Animated, View } from "react-native";

import { Caption } from "@/components/ui/Caption";
import { FullScreenLoader } from "@/components/ui/loader/FullScreenLoader";
import { useLoaderLoop } from "@/components/ui/loader/hooks";
import { loaderTimings } from "@/components/ui/loader/loader.styles";
import { useTheme } from "@/hooks";

export interface StartupLoaderProps {
  label?: string;
}

export const StartupLoader = ({ label = "Preparing your sales and inventory workspace..." }: StartupLoaderProps) => {
  const { colors, radius } = useTheme();
  const pulse = useLoaderLoop(0, 1, loaderTimings.pulse);

  const badgeStyle = {
    opacity: pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1.02],
        }),
      },
    ],
  };

  return (
    <View className="flex-1">
      <View className="absolute left-0 right-0 top-24 items-center z-10">
        <Animated.View
          style={[
            {
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: radius.full,
              backgroundColor: colors.primaryMuted,
              borderWidth: 1,
              borderColor: colors.border,
            },
            badgeStyle,
          ]}
        >
          <Caption tone="primary">BizStock</Caption>
        </Animated.View>
      </View>
      <FullScreenLoader title="Starting Operations" label={label} />
    </View>
  );
};
