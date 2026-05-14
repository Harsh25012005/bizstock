import { Asset } from "expo-asset";
import { useEffect, useMemo, useState } from "react";
import { Animated, useWindowDimensions, View } from "react-native";
import { SvgUri } from "react-native-svg";

export interface OnboardingCardProps {
  illustration: number;
  progress: Animated.Value;
  index: number;
}

export const OnboardingCard = ({ illustration, progress, index }: OnboardingCardProps) => {
  const { height } = useWindowDimensions();
  const [illustrationUri, setIllustrationUri] = useState<string | null>(null);

  useEffect(() => {
    void Asset.fromModule(illustration)
      .downloadAsync()
      .then((asset) => {
        setIllustrationUri(asset.localUri ?? asset.uri);
      });
  }, [illustration]);

  const cardOpacity = progress.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.38, 1, 0.38],
    extrapolate: "clamp",
  });

  const cardTranslateX = progress.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [26, 0, -26],
    extrapolate: "clamp",
  });

  const cardTranslateY = progress.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [8, 0, 8],
    extrapolate: "clamp",
  });

  const cardScale = progress.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.96, 1, 0.96],
    extrapolate: "clamp",
  });

  const illustrationHeight = useMemo(() => Math.min(height * 0.34, 260), [height]);

  return (
    <View className="flex-1 px-8">
      <Animated.View
        className="flex-1 items-center justify-center"
        style={{
          opacity: cardOpacity,
          transform: [{ translateX: cardTranslateX }, { translateY: cardTranslateY }, { scale: cardScale }],
        }}
      >
        <View
          className="w-full items-center justify-center"
          style={{
            height: illustrationHeight,
            maxWidth: 320,
          }}
        >
          {illustrationUri ? <SvgUri uri={illustrationUri} width="100%" height="100%" /> : null}
        </View>
      </Animated.View>
    </View>
  );
};
