import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const EmptyState = ({ title, description, actionLabel, onActionPress }: EmptyStateProps) => {
  const { colors, radius } = useTheme();

  return (
    <Card className="items-center gap-3 py-8">
      <View
        className="h-14 w-14"
        style={{
          backgroundColor: colors.primaryMuted,
          borderRadius: radius.full,
        }}
      />
      <Heading level={3}>{title}</Heading>
      <Text className="text-center" tone="secondary">
        {description}
      </Text>
      {actionLabel && onActionPress ? (
        <Button className="mt-2" label={actionLabel} onPress={onActionPress} />
      ) : null}
    </Card>
  );
};
