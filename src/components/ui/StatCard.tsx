import { Card } from "@/components/ui/Card";
import { Caption } from "@/components/ui/Caption";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";
import { View } from "react-native";

export interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "success" | "warning" | "danger" | "info";
}

export const StatCard = ({ label, value, hint, tone = "primary" }: StatCardProps) => {
  const { colors, radius } = useTheme();

  const accent = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,
  }[tone];

  return (
    <Card elevated>
      <View className="gap-3">
        <View className="h-1.5 w-12" style={{ backgroundColor: accent, borderRadius: radius.full }} />
        <Caption>{label}</Caption>
        <Heading level={2}>{value}</Heading>
        {hint ? <Text size="sm" tone="secondary">{hint}</Text> : null}
      </View>
    </Card>
  );
};
