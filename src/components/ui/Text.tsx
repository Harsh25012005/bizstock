import { forwardRef } from "react";
import { Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native";

import { useTheme } from "@/hooks";
import { cn } from "@/utils";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
type TextWeight = "regular" | "medium" | "semibold" | "bold";
type TextTone = "primary" | "secondary" | "inverse" | "success" | "warning" | "danger" | "info";

export interface TextProps extends RNTextProps {
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
}

const toneKeyMap = {
  primary: "text",
  secondary: "textSecondary",
  inverse: "textInverse",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
} as const;

export const Text = forwardRef<RNText, TextProps>(
  ({ size = "base", weight = "regular", tone = "primary", style, className, ...props }, ref) => {
    const { colors, typography } = useTheme();

    const textStyle: TextStyle = {
      color: colors[toneKeyMap[tone]],
      fontSize: typography.fontSize[size],
      lineHeight: typography.lineHeight[size],
      fontFamily: typography.fontFamily[weight],
      fontWeight: typography.fontWeight[weight],
    };

    return <RNText ref={ref} style={[textStyle, style]} className={cn(className)} {...props} />;
  },
);

Text.displayName = "Text";
