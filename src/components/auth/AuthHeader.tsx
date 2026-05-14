import { Image, View } from "react-native";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { APP_NAME, bizstockLogo } from "@/constants";

export interface AuthHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ eyebrow, title, subtitle }: AuthHeaderProps) => {
  return (
    <View className="items-start gap-4">
      <View className="flex-row items-center gap-3">
        <Image source={bizstockLogo} resizeMode="contain" style={{ width: 40, height: 40 }} />
        <View>
          <Text size="sm" weight="bold">
            {APP_NAME}
          </Text>
          <Text size="xs" tone="secondary" weight="medium">
            Wholesale operations
          </Text>
        </View>
      </View>

      <View className="gap-2">
        {eyebrow ? (
          <Text size="sm" weight="semibold" style={{ color: "#F97316" }}>
            {eyebrow}
          </Text>
        ) : null}
        <Heading level={2}>{title}</Heading>
        <Text tone="secondary" style={{ lineHeight: 24 }}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};
