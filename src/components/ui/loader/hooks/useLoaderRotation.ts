import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useLoaderRotation = (duration: number) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
      rotation.stopAnimation();
      rotation.setValue(0);
    };
  }, [duration, rotation]);

  return rotation;
};
