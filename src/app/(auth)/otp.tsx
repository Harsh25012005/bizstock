import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { Button, Input, PlaceholderCard, ScreenWrapper } from "@/components";
import { getFirebaseErrorMessage } from "@/firebase";
import { PROTECTED_HOME_ROUTE } from "@/constants";
import { useToast } from "@/hooks";
import { otpSchema, type OtpSchema } from "@/schemas";
import { useAuthStore } from "@/store";

export default function OtpScreen() {
  const router = useRouter();
  const verifyPendingOtp = useAuthStore((state) => state.verifyPendingOtp);
  const pendingVerification = useAuthStore((state) => state.pendingVerification);
  const { show } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = handleSubmit(async ({ otp }) => {
    try {
      await verifyPendingOtp(otp);
      show({
        title: "Authentication complete",
        description: "The Firebase-backed session is now available to the route guard and stores.",
        variant: "success",
      });
      router.replace(PROTECTED_HOME_ROUTE);
    } catch (error) {
      show({
        title: "OTP verification failed",
        description: getFirebaseErrorMessage(error),
        variant: "error",
      });
    }
  });

  return (
    <ScreenWrapper
      title="OTP verification"
      subtitle="Confirm the verification code returned by the Firebase phone auth flow."
    >
      <View className="gap-4">
        <PlaceholderCard title="Verify code" subtitle={pendingVerification?.phoneNumber ?? "Waiting for OTP request"}>
          <View className="gap-4">
            <Controller
              control={control}
              name="otp"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="One-time password"
                  placeholder="Enter 6-digit code"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  error={errors.otp?.message}
                />
              )}
            />
            <Button label="Continue" onPress={onSubmit} isLoading={isSubmitting} disabled={!pendingVerification} />
          </View>
        </PlaceholderCard>
        <Text className="text-sm leading-6 text-ink-500">
          If Firebase is not configured, development mode uses a mock verification id so the rest of the
          app shell can still be exercised safely.
        </Text>
      </View>
    </ScreenWrapper>
  );
}
