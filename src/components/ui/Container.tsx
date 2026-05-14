import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

import { cn } from "@/utils";

export interface ContainerProps extends PropsWithChildren, ViewProps {
  padded?: boolean;
}

export const Container = ({ children, padded = true, className, ...props }: ContainerProps) => {
  return (
    <View className={cn("w-full self-center", padded && "px-4", className)} {...props}>
      {children}
    </View>
  );
};
