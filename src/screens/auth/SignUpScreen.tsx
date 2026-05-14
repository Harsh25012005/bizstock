import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton, AuthInput, PasswordInput, SocialLoginButton } from "@/components/auth";
import { Text } from "@/components/ui/Text";
import { AUTH_ADD_BUSINESS_ROUTE, AUTH_HOME_ROUTE, bizstockLogo } from "@/constants";
import { getFirebaseErrorMessage } from "@/firebase";
import { useTheme, useToast } from "@/hooks";
import { signUpSchema, type SignUpSchema } from "@/schemas";
import { useAuthStore } from "@/store";

export const SignUpScreen = () => {
  const router = useRouter();
  const { show } = useToast();
  const { colors, isDark } = useTheme();
  const signUpWithEmail = useAuthStore((state) => state.signUpWithEmail);
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const isLoading = useAuthStore((state) => state.isLoading);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const acceptTerms = form.watch("acceptTerms");

  const submit = form.handleSubmit(async (values) => {
    try {
      await signUpWithEmail({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: "",
        password: values.password,
      });

      show({
        title: "Account created",
        description: "Now tell us about your business so we can set up your workspace.",
        variant: "success",
      });

      router.replace(AUTH_ADD_BUSINESS_ROUTE);
    } catch (error) {
      show({
        title: "Unable to create account",
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
                Registration
              </Text>
              <Text
                className="mt-1.5"
                size="sm"
                tone="secondary"
                style={{
                  textAlign: "center",
                  maxWidth: 240,
                  lineHeight: 20,
                }}
              >
                Enter the fields below to get started with your BizStock account.
              </Text>
            </View>

            <View className="mt-6 w-full max-w-[360px] gap-4">
              <Controller
                control={form.control}
                name="fullName"
                render={({ field: { onChange, value } }) => (
                  <AuthInput
                    label="Name"
                    placeholder="Enter your name"
                    value={value}
                    onChangeText={onChange}
                    error={form.formState.errors.fullName?.message}
                  />
                )}
              />

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

              <Controller
                control={form.control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Create password"
                    value={value}
                    onChangeText={onChange}
                    error={form.formState.errors.password?.message}
                  />
                )}
              />

              <Pressable
                className="flex-row items-center gap-3"
                onPress={() => form.setValue("acceptTerms", !acceptTerms, { shouldValidate: true })}
              >
                <View
                  className="items-center justify-center border"
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    backgroundColor: acceptTerms ? colors.primary : "transparent",
                    borderColor: acceptTerms ? colors.primary : colors.border,
                  }}
                >
                  {acceptTerms ? (
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        backgroundColor: colors.textInverse,
                      }}
                    />
                  ) : null}
                </View>
                <Text size="sm" tone="secondary">
                  I accept terms and privacy policy
                </Text>
              </Pressable>
              {form.formState.errors.acceptTerms?.message ? (
                <Text size="sm" tone="danger">
                  {form.formState.errors.acceptTerms.message}
                </Text>
              ) : null}

              <View className="pt-2">
                <AuthButton label="Create Account" onPress={() => void submit()} isLoading={isLoading} />
              </View>
            </View>

            <View className="mt-6 w-full max-w-[360px] gap-4">
              <View className="flex-row items-center gap-3">
                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                <Text size="sm" tone="secondary">
                  Or continue with
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              </View>

              <View className="items-center">
                <SocialLoginButton
                  label="Continue with Google"
                  onPress={async () => {
                    try {
                      await signInWithGoogle();
                    } catch (error) {
                      show({
                        title: "Google Sign-Up unavailable",
                        description: getFirebaseErrorMessage(error),
                        variant: "error",
                      });
                    }
                  }}
                />
              </View>

              <View className="items-center">
                <View className="flex-row items-center justify-center gap-1">
                  <Text size="sm" tone="secondary">
                    Already have an account?
                  </Text>
                  <Text size="sm" weight="semibold" style={{ color: colors.primary }} onPress={() => router.replace(AUTH_HOME_ROUTE)}>
                    Sign in
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
