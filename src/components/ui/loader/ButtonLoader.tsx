import { Animated, View } from "react-native";

import { loaderSizes, loaderTimings } from "@/components/ui/loader/loader.styles";
import { useLoaderRotation } from "@/components/ui/loader/hooks";
import { useTheme } from "@/hooks";

export interface ButtonLoaderProps {
  inverse?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ButtonLoader = ({ inverse = false, size = "md" }: ButtonLoaderProps) => {
  const { colors } = useTheme();
  const color = inverse ? colors.textInverse : colors.primary;
  const muted = inverse ? "rgba(255,255,255,0.22)" : colors.primaryMuted;
  const ringSize = loaderSizes.buttonRing[size];
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
    <View className="items-center justify-center">
      <Animated.View
        style={[
          {
            width: ringSize,
            height: ringSize,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: muted,
            borderTopColor: color,
          },
          ringStyle,
        ]}
      />
    </View>
  );
};
