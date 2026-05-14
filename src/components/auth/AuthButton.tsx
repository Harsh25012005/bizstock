import { useRef } from "react";
import { Animated } from "react-native";
import type { PressableProps } from "react-native";

import { Button, type ButtonProps } from "@/components/ui/Button";

export interface AuthButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  onPress?: PressableProps["onPress"];
}

export const AuthButton = ({ onPress, onPressIn, onPressOut, ...props }: AuthButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (value: number) => {
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      friction: 8,
      tension: 180,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Button
        variant="primary"
        size="lg"
        onPress={onPress}
        onPressIn={(event) => {
          animate(0.985);
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          animate(1);
          onPressOut?.(event);
        }}
        {...props}
      />
    </Animated.View>
  );
};
