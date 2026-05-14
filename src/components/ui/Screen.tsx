import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Container } from "@/components/ui/Container";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

export interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
  contentClassName?: string;
}

export const Screen = ({ children, scrollable = true, contentClassName }: ScreenProps) => {
  const { colors } = useTheme();

  const content = (
    <Container className={cn("flex-1 py-4", contentClassName)}>
      <View className="gap-4">{children}</View>
    </Container>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {scrollable ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
};
