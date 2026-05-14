import { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";

import { Heading } from "@/components/ui/Heading";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";

interface ScreenWrapperProps extends PropsWithChildren {
  title?: ReactNode;
  subtitle?: string;
  scrollable?: boolean;
  className?: string;
}

export const ScreenWrapper = ({
  title,
  subtitle,
  children,
  scrollable = true,
  className,
}: ScreenWrapperProps) => {
  return (
    <Screen scrollable={scrollable} contentClassName={className}>
      {title ? (
        <View className="gap-2">
          {typeof title === "string" ? <Heading level={2}>{title}</Heading> : title}
          {subtitle ? <Text tone="secondary">{subtitle}</Text> : null}
        </View>
      ) : null}
      {children}
    </Screen>
  );
};
