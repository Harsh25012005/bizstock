import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  description = "The UI system hit an unexpected error.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <Card className="gap-4">
      <View className="gap-2">
        <Heading level={3}>{title}</Heading>
        <Text tone="secondary">{description}</Text>
      </View>
      {onRetry ? <Button label="Try again" onPress={onRetry} /> : null}
    </Card>
  );
};
