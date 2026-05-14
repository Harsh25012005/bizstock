import { PropsWithChildren } from "react";
import { Animated, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { loaderTimings } from "@/components/ui/loader/loader.styles";
import { useLoaderLoop } from "@/components/ui/loader/hooks";
import { useTheme } from "@/hooks";

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  rounded?: "sm" | "md" | "lg" | "full";
}

export const Skeleton = ({ width = "100%", height = 16, rounded = "md" }: SkeletonProps) => {
  const { colors, radius } = useTheme();
  const shimmer = useLoaderLoop(0, 1, loaderTimings.shimmer);

  const radiusValue = {
    sm: radius.sm,
    md: radius.md,
    lg: radius.lg,
    full: radius.full,
  }[rounded];

  const shimmerStyle = {
    opacity: shimmer.interpolate({
      inputRange: [0, 1],
      outputRange: [0.45, 0.9],
    }),
    transform: [
      {
        scaleX: shimmer.interpolate({
          inputRange: [0, 1],
          outputRange: [0.985, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radiusValue,
          backgroundColor: colors.primaryMuted,
        },
        shimmerStyle,
      ]}
    />
  );
};

export const SkeletonCard = ({ children }: PropsWithChildren) => {
  return (
    <Card className="gap-3">
      {children ?? (
        <>
          <Skeleton width="48%" height={12} rounded="full" />
          <Skeleton width="76%" height={20} />
          <Skeleton width="100%" height={14} />
          <Skeleton width="64%" height={14} />
        </>
      )}
    </Card>
  );
};

export const SkeletonStatRow = () => {
  return (
    <View className="gap-3">
      <Skeleton width="36%" height={12} rounded="full" />
      <Skeleton width="58%" height={24} />
      <Skeleton width="44%" height={14} />
    </View>
  );
};
