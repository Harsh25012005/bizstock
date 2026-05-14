import { PropsWithChildren } from "react";
import { View } from "react-native";

import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

interface ShowcaseSectionProps extends PropsWithChildren {
  title: string;
  description?: string;
  className?: string;
}

export const ShowcaseSection = ({
  title,
  description,
  children,
  className,
}: ShowcaseSectionProps) => {
  return (
    <Card elevated className={cn("overflow-hidden p-0", className)}>
      <View className="gap-4 px-4 py-4">
        <View className="gap-1">
          <Heading level={4}>{title}</Heading>
          {description ? (
            <Text size="sm" tone="secondary">
              {description}
            </Text>
          ) : null}
        </View>
        {children}
      </View>
    </Card>
  );
};

export const ShowcaseSectionHeader = ({ title }: { title: string }) => {
  const { colors } = useTheme();

  return (
    <View className="px-4 py-3" style={{ backgroundColor: colors.background }}>
      <Text size="sm" weight="bold" tone="secondary">
        {title}
      </Text>
    </View>
  );
};
