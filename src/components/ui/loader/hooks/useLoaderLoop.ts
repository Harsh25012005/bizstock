import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useLoaderLoop = (fromValue: number, toValue: number, duration: number, delay = 0) => {
  const progress = useRef(new Animated.Value(fromValue)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(progress, {
        toValue,
        duration,
        delay,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: fromValue,
        duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    const animation = Animated.loop(sequence);
    animation.start();

    return () => {
      animation.stop();
      progress.stopAnimation();
      progress.setValue(fromValue);
    };
  }, [delay, duration, fromValue, progress, toValue]);

  return progress;
};
