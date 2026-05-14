import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Animated, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton, AuthInput, PasswordInput, SegmentedTabs, SocialLoginButton } from "@/components/auth";
import { Text } from "@/components/ui/Text";
import {
  AUTH_FORGOT_PASSWORD_ROUTE,
  AUTH_METHOD_OPTIONS,
  AUTH_OTP_ROUTE,
  AUTH_SIGN_UP_ROUTE,
  DEFAULT_COUNTRY_CODE,
  PROTECTED_HOME_ROUTE,
  bizstockLogo,
} from "@/constants";
import { getFirebaseErrorMessage } from "@/firebase";
import { useTheme, useToast } from "@/hooks";
import { signInEmailSchema, signInPhoneSchema, type SignInEmailSchema, type SignInPhoneSchema } from "@/schemas";
import { useAuthStore } from "@/store";

export const SignInScreen = () => {
  const router = useRouter();
  const { show } = useToast();
  const { colors, isDark, radius } = useTheme();
  const authMethod = useAuthStore((state) => state.authMethod);
  const setAuthMethod = useAuthStore((state) => state.setAuthMethod);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const signInWithEmail = useAuthStore((state) => state.signInWithEmail);
  const requestOtp = useAuthStore((state) => state.requestOtp);
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const isLoading = useAuthStore((state) => state.isLoading);
  const switchAnimation = useRef(new Animated.Value(1)).current;

  const emailForm = useForm<SignInEmailSchema>({
    resolver: zodResolver(signInEmailSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe,
    },
  });

  const phoneForm = useForm<SignInPhoneSchema>({
    resolver: zodResolver(signInPhoneSchema),
    defaultValues: {
      countryCode: DEFAULT_COUNTRY_CODE,
      phoneNumber: "",
    },
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(switchAnimation, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(switchAnimation, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [authMethod, switchAnimation]);

  const submitEmail = emailForm.handleSubmit(async (values) => {
    try {
      setRememberMe(values.rememberMe);
      await signInWithEmail({
        email: values.email,
        password: values.password,
      });

      show({
        title: "Signed in",
        description: "Welcome back to your BizStock workspace.",
        variant: "success",
      });

      router.replace(PROTECTED_HOME_ROUTE);
    } catch (error) {
      show({
        title: "Unable to sign in",
        description: getFirebaseErrorMessage(error),
        variant: "error",
      });
    }
  });

  const submitPhone = phoneForm.handleSubmit(async (values) => {
    try {
      await requestOtp(`${values.countryCode}${values.phoneNumber}`);

      show({
        title: "OTP sent",
        description: "Enter the 6-digit code to continue with mobile sign in.",
        variant: "success",
      });

      router.push(AUTH_OTP_ROUTE);
    } catch (error) {
      show({
        title: "Unable to send OTP",
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
                Welcome Back
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
                Sign in to continue managing your wholesale business smoothly.
              </Text>
            </View>

            <View className="mt-6 w-full max-w-[360px] gap-4">
              <SegmentedTabs value={authMethod} options={AUTH_METHOD_OPTIONS} onChange={setAuthMethod} />

              <Animated.View
                style={{
                  opacity: switchAnimation,
                  transform: [
                    {
                      translateY: switchAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0],
                      }),
                    },
                  ],
                }}
              >
                {authMethod === "email" ? (
                  <View className="gap-4">
                    <Controller
                      control={emailForm.control}
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
                          error={emailForm.formState.errors.email?.message}
                        />
                      )}
                    />

                    <Controller
                      control={emailForm.control}
                      name="password"
                      render={({ field: { onChange, value } }) => (
                        <PasswordInput
                          label="Password"
                          placeholder="Enter password"
                          value={value}
                          onChangeText={onChange}
                          error={emailForm.formState.errors.password?.message}
                        />
                      )}
                    />

                    <View className="flex-row items-center justify-between">
                      <Pressable
                        className="flex-row items-center gap-3"
                        onPress={() => {
                          const nextValue = !emailForm.watch("rememberMe");
                          emailForm.setValue("rememberMe", nextValue);
                          setRememberMe(nextValue);
                        }}
                      >
                        <View
                          className="items-center justify-center border"
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 5,
                            backgroundColor: emailForm.watch("rememberMe") ? colors.primary : "transparent",
                            borderColor: emailForm.watch("rememberMe") ? colors.primary : colors.border,
                          }}
                        >
                          {emailForm.watch("rememberMe") ? (
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
                          Remember me
                        </Text>
                      </Pressable>

                      <Text
                        size="sm"
                        weight="semibold"
                        style={{ color: colors.primary }}
                        onPress={() => router.push(AUTH_FORGOT_PASSWORD_ROUTE)}
                      >
                        Forgot Password?
                      </Text>
                    </View>

                    <AuthButton label="Login" onPress={() => void submitEmail()} isLoading={isLoading} />
                  </View>
                ) : (
                  <View className="gap-4">
                    <Controller
                      control={phoneForm.control}
                      name="phoneNumber"
                      render={({ field: { onChange, value } }) => (
                        <AuthInput
                          label="Mobile Number"
                          placeholder="Enter your mobile number"
                          keyboardType="number-pad"
                          value={value}
                          onChangeText={onChange}
                          error={phoneForm.formState.errors.phoneNumber?.message}
                          leftAccessory={
                            <View
                              className="items-center justify-center border px-3"
                              style={{
                                height: 42,
                                borderRadius: radius.full,
                                backgroundColor: isDark ? "#1E1E22" : "#FFFFFF",
                                borderColor: colors.border,
                              }}
                            >
                              <Text size="sm" weight="semibold">
                                {phoneForm.watch("countryCode")}
                              </Text>
                            </View>
                          }
                        />
                      )}
                    />

                    <Text size="sm" tone="secondary" style={{ lineHeight: 20 }}>
                      We'll send a secure one-time password to verify your business mobile number.
                    </Text>

                    <AuthButton label="Continue" onPress={() => void submitPhone()} isLoading={isLoading} />
                  </View>
                )}
              </Animated.View>
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
                        title: "Google Sign-In unavailable",
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
                    Don't have an account?
                  </Text>
                  <Text size="sm" weight="semibold" style={{ color: colors.primary }} onPress={() => router.push(AUTH_SIGN_UP_ROUTE)}>
                    Sign up
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
