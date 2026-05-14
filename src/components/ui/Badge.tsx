import { View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";

type BadgeVariant = "primary" | "neutral" | "success" | "warning" | "danger" | "info";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export const Badge = ({ label, variant = "neutral" }: BadgeProps) => {
  const { colors, radius } = useTheme();

  const backgroundMap = {
    primary: colors.primaryMuted,
    neutral: colors.surface,
    success: `${colors.success}1A`,
    warning: `${colors.warning}1A`,
    danger: `${colors.danger}1A`,
    info: `${colors.info}1A`,
  } as const;

  const toneMap = {
    primary: "primary",
    neutral: "secondary",
    success: "success",
    warning: "warning",
    danger: "danger",
    info: "info",
  } as const;

  return (
    <View
      className="self-start px-3 py-1.5"
      style={{
        backgroundColor: backgroundMap[variant],
        borderRadius: radius.full,
      }}
    >
      <Text size="xs" weight="semibold" tone={toneMap[variant]}>
        {label}
      </Text>
    </View>
  );
};
