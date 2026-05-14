import { ReactNode } from "react";
import { Pressable, PressableProps, View } from "react-native";

import { renderButtonAccessory } from "@/components/ui/button-accessory";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

type IconButtonVariant = "primary" | "secondary" | "ghost";

export interface IconButtonProps extends Omit<PressableProps, "style"> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: "sm" | "md" | "lg";
}

const dimensions = {
  sm: 36,
  md: 48,
  lg: 56,
} as const;

export const IconButton = ({
  icon,
  variant = "secondary",
  size = "md",
  disabled,
  className,
  ...props
}: IconButtonProps) => {
  const { colors, radius } = useTheme();

  const backgroundMap = {
    primary: colors.primary,
    secondary: colors.surface,
    ghost: "transparent",
  } as const;

  const borderMap = {
    primary: colors.primary,
    secondary: colors.border,
    ghost: "transparent",
  } as const;

  const iconColor = variant === "primary" ? colors.textInverse : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={cn("items-center justify-center border", disabled && "opacity-60", className)}
      style={{
        width: dimensions[size],
        height: dimensions[size],
        borderRadius: radius.full,
        backgroundColor: backgroundMap[variant],
        borderColor: borderMap[variant],
      }}
      {...props}
    >
      <View>{renderButtonAccessory(icon, variant === "primary" ? "inverse" : "primary", iconColor)}</View>
    </Pressable>
  );
};
