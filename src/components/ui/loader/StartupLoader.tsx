import { Animated, Image, View } from "react-native";

import { bizstockLogo } from "@/constants";
import { useLoaderLoop } from "@/components/ui/loader/hooks";
import { loaderTimings } from "@/components/ui/loader/loader.styles";
import { useTheme } from "@/hooks";

export interface StartupLoaderProps {
  label?: string;
}

export const StartupLoader = ({}: StartupLoaderProps) => {
  const { colors } = useTheme();
  const pulse = useLoaderLoop(0, 1, loaderTimings.pulse);
  const logoStyle = {
    opacity: pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.88, 1],
    }),
    transform: [
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1.03],
        }),
      },
    ],
  };

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
      <Animated.View style={logoStyle}>
        <Image source={bizstockLogo} resizeMode="contain" style={{ width: 220, height: 220 }} />
      </Animated.View>
    </View>
  );
};
