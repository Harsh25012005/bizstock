import { ReactNode } from "react";
import { Pressable, PressableProps, View } from "react-native";

import { ButtonLoader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text";
import { renderButtonAccessory } from "@/components/ui/button-accessory";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: "h-9 px-3",
  md: "h-11 px-5",
  lg: "h-14 px-6",
} as const;

const textSizes = {
  sm: "sm",
  md: "base",
  lg: "lg",
} as const;

export const Button = ({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className,
  ...props
}: ButtonProps) => {
  const { colors, radius } = useTheme();
  const shouldShowLoader = loading || isLoading;
  const isDisabled = disabled || shouldShowLoader;

  const surfaceMap = {
    primary: colors.primary,
    secondary: colors.surface,
    outline: "transparent",
    ghost: "transparent",
    danger: colors.danger,
    success: colors.success,
  } as const;

  const borderMap = {
    primary: colors.primary,
    secondary: colors.border,
    outline: colors.primary,
    ghost: "transparent",
    danger: colors.danger,
    success: colors.success,
  } as const;

  const textToneMap = {
    primary: "inverse",
    secondary: "primary",
    outline: "primary",
    ghost: "primary",
    danger: "inverse",
    success: "inverse",
  } as const;

  const iconColor =
    variant === "secondary" || variant === "outline" || variant === "ghost"
      ? colors.text
      : colors.textInverse;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(
        "items-center justify-center border",
        fullWidth && "w-full",
        sizeClasses[size],
        isDisabled && "opacity-60",
        className,
      )}
      style={{
        backgroundColor: surfaceMap[variant],
        borderColor: borderMap[variant],
        borderRadius: radius.full,
      }}
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2.5">
        {shouldShowLoader ? (
          <ButtonLoader
            size={size}
            inverse={variant === "primary" || variant === "danger" || variant === "success"}
          />
        ) : (
          renderButtonAccessory(leftIcon, textToneMap[variant], iconColor)
        )}
        <Text size={textSizes[size]} weight="semibold" tone={textToneMap[variant]}>
          {label}
        </Text>
        {!shouldShowLoader ? renderButtonAccessory(rightIcon, textToneMap[variant], iconColor) : null}
      </View>
    </Pressable>
  );
};
