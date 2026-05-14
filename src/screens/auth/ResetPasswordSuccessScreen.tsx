import { useRouter } from "expo-router";
import { View } from "react-native";

import { AuthButton } from "@/components/auth";
import { Text } from "@/components/ui/Text";
import { AUTH_HOME_ROUTE } from "@/constants";
import { useTheme } from "@/hooks";

import { AuthScreenLayout } from "./AuthScreenLayout";

export const ResetPasswordSuccessScreen = () => {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <AuthScreenLayout
      title="Check your inbox"
      subtitle="We’ve sent password reset instructions to your email address."
    >
      <View className="gap-6">
        <View className="items-center gap-4 py-4">
          <View
            className="items-center justify-center"
            style={{
              width: 92,
              height: 92,
              borderRadius: 999,
              backgroundColor: isDark ? "rgba(249,115,22,0.18)" : "rgba(249,115,22,0.1)",
            }}
          >
            <View
              className="items-center justify-center"
              style={{
                width: 54,
                height: 54,
                borderRadius: 999,
                backgroundColor: colors.primary,
              }}
            >
              <Text size="xl" weight="bold" tone="inverse">
                ✓
              </Text>
            </View>
          </View>

          <Text tone="secondary" style={{ textAlign: "center", lineHeight: 22 }}>
            Open the email, follow the reset link, and then come back to sign in to BizStock.
          </Text>
        </View>

        <AuthButton label="Back to Sign In" onPress={() => router.replace(AUTH_HOME_ROUTE)} />
      </View>
    </AuthScreenLayout>
  );
};
