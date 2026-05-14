import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton, AuthInput } from "@/components/auth";
import { Text } from "@/components/ui/Text";
import { AUTH_HOME_ROUTE, AUTH_RESET_SUCCESS_ROUTE, bizstockLogo } from "@/constants";
import { getFirebaseErrorMessage } from "@/firebase";
import { useTheme, useToast } from "@/hooks";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "@/schemas";
import { useAuthStore } from "@/store";

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { show } = useToast();
  const { colors } = useTheme();
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const isLoading = useAuthStore((state) => state.isLoading);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const submit = form.handleSubmit(async ({ email }) => {
    try {
      await forgotPassword(email);
      show({
        title: "Reset email sent",
        description: "Check your inbox for the password reset link.",
        variant: "success",
      });
      router.replace(AUTH_RESET_SUCCESS_ROUTE);
    } catch (error) {
      show({
        title: "Unable to send reset email",
        description: getFirebaseErrorMessage(error),
        variant: "error",
      });
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 24,
          }}
        >
          <View className="flex-1 items-center">
            <View className="w-full max-w-[360px] items-center">
              <Image source={bizstockLogo} resizeMode="contain" style={{ width: 92, height: 92 }} />

              <Text className="mt-3" size="2xl" weight="bold" style={{ textAlign: "center" }}>
                Forgot Password?
              </Text>
              <Text
                className="mt-1.5"
                size="sm"
                tone="secondary"
                style={{
                  textAlign: "center",
                  maxWidth: 250,
                  lineHeight: 20,
                }}
              >
                Enter your business email and we'll send a reset link right away.
              </Text>
            </View>

            <View className="mt-6 w-full max-w-[360px] gap-4">
              <Controller
                control={form.control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <AuthInput
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    error={form.formState.errors.email?.message}
                  />
                )}
              />

              <AuthButton label="Send Reset Email" onPress={() => void submit()} isLoading={isLoading} />
            </View>

            <View className="mt-6 w-full max-w-[360px] items-center">
              <View className="flex-row items-center justify-center gap-1">
                <Text size="sm" tone="secondary">
                  Remembered your password?
                </Text>
                <Text size="sm" weight="semibold" style={{ color: colors.primary }} onPress={() => router.replace(AUTH_HOME_ROUTE)}>
                  Sign in
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
