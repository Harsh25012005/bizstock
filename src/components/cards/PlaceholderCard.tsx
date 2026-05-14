import { PropsWithChildren } from "react";
import { View } from "react-native";

import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

interface PlaceholderCardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export const PlaceholderCard = ({ title, subtitle, children }: PlaceholderCardProps) => {
  return (
    <Card elevated>
      <View className="gap-4">
        <View className="gap-1">
          <Heading level={4}>{title}</Heading>
          {subtitle ? <Text size="sm" tone="secondary">{subtitle}</Text> : null}
        </View>
        {children}
      </View>
    </Card>
  );
};
