import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

import { useTheme } from "@/hooks";
import { cn } from "@/utils";

export interface CardProps extends PropsWithChildren, ViewProps {
  elevated?: boolean;
}

export const Card = ({ children, elevated = false, className, ...props }: CardProps) => {
  const { colors, radius } = useTheme();

  return (
    <View
      className={cn("border p-4", className)}
      style={{
        backgroundColor: colors.card,
        borderColor: elevated ? colors.border : colors.border,
        borderRadius: radius.lg,
      }}
      {...props}
    >
      {children}
    </View>
  );
};
