import { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";

interface AuthScreenLayoutProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  sheetTitle?: string;
  footer?: ReactNode;
  bottomNote?: ReactNode;
  topActionLabel?: string;
  onTopActionPress?: () => void;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export const AuthScreenLayout = ({
  title,
  subtitle,
  sheetTitle,
  children,
  footer,
  bottomNote,
  topActionLabel,
  onTopActionPress,
  onBackPress,
  showBackButton = true,
}: AuthScreenLayoutProps) => {
  const { colors, isDark, radius } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: isDark ? "#17111B" : "#FFF7F1",
          }}
        >
          <View className="flex-1">
            <View
              className="px-5 pb-8 pt-3"
              style={{
                minHeight: 260,
                backgroundColor: isDark ? "#28124A" : "#A64012",
              }}
            >
              <View className="flex-row items-center justify-between">
                <View style={{ width: 88 }}>
                  {showBackButton ? (
                    <Pressable
                      onPress={onBackPress}
                      className="items-center justify-center"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        backgroundColor: "rgba(255,255,255,0.18)",
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.24)",
                      }}
                    >
                      <Text weight="bold" tone="inverse">
                        {"<"}
                      </Text>
                    </Pressable>
                  ) : null}
                </View>

                <View style={{ minWidth: 88, alignItems: "flex-end" }}>
                  {topActionLabel && onTopActionPress ? (
                    <Text size="sm" weight="medium" tone="inverse" onPress={onTopActionPress}>
                      {topActionLabel}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View className="mt-10 gap-3">
                <Heading level={2} tone="inverse">
                  {title}
                </Heading>
                <Text tone="inverse" style={{ maxWidth: 280, lineHeight: 23, opacity: 0.88 }}>
                  {subtitle}
                </Text>
              </View>
            </View>

            <View className="flex-1 px-4" style={{ marginTop: -22 }}>
              <View
                className="flex-1 border px-4 pb-5 pt-3"
                style={{
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  borderBottomLeftRadius: 18,
                  borderBottomRightRadius: 18,
                  backgroundColor: isDark ? "#111114" : "#FFFFFF",
                  borderColor: isDark ? "#26262B" : "#ECE8E2",
                  shadowColor: "#000000",
                  shadowOpacity: isDark ? 0.28 : 0.08,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 3,
                }}
              >
                {sheetTitle ? (
                  <View className="items-center pb-4 pt-1">
                    <Text size="sm" weight="medium" tone="secondary">
                      {sheetTitle}
                    </Text>
                  </View>
                ) : null}

                <View className="gap-4">{children}</View>

                {footer ? <View className="mt-5">{footer}</View> : null}
                {bottomNote ? <View className="mt-6 items-center">{bottomNote}</View> : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const AuthFooterLink = ({
  prefix,
  actionLabel,
  onPress,
}: {
  prefix: string;
  actionLabel: string;
  onPress: () => void;
}) => {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <Text size="sm" tone="secondary">
        {prefix}
      </Text>
      <Text size="sm" weight="semibold" style={{ color: "#F97316" }} onPress={onPress}>
        {actionLabel}
      </Text>
    </View>
  );
};

export const AuthDivider = ({ label = "Or login with" }: { label?: string }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-3">
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
      <Text size="sm" tone="secondary">
        {label}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
    </View>
  );
};
