import { useRef } from "react";
import { Animated } from "react-native";
import type { PressableProps } from "react-native";

import { Button, type ButtonProps } from "@/components/ui/Button";

export interface OnboardingButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  onPress?: PressableProps["onPress"];
}

export const OnboardingButton = ({ label, onPress, onPressIn, onPressOut, ...props }: OnboardingButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      friction: 7,
      tension: 180,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Button
        label={label}
        variant="primary"
        size="lg"
        onPress={onPress}
        onPressIn={(event) => {
          animateTo(0.98);
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          animateTo(1);
          onPressOut?.(event);
        }}
        {...props}
      />
    </Animated.View>
  );
};
