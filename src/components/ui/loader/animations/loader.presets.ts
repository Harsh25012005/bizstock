import { Easing } from "react-native";

import { loaderTimings } from "@/components/ui/loader/loader.styles";

export const loaderEasing = Easing.inOut(Easing.ease);

export const loaderAnimationPresets = {
  pulse: {
    duration: loaderTimings.pulse,
    easing: loaderEasing,
  },
  rotate: {
    duration: loaderTimings.rotate,
    easing: loaderEasing,
  },
  shimmer: {
    duration: loaderTimings.shimmer,
    easing: loaderEasing,
  },
} as const;
