import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { AuthButton, OTPInput } from "@/components/auth";
import { Text } from "@/components/ui/Text";
import { AUTH_HOME_ROUTE, PROTECTED_HOME_ROUTE } from "@/constants";
import { getFirebaseErrorMessage } from "@/firebase";
import { useOtpTimer, useToast, useTheme } from "@/hooks";
import { otpSchema, type OtpSchema } from "@/schemas";
import { useAuthStore } from "@/store";

import { AuthScreenLayout } from "./AuthScreenLayout";

export const OtpVerificationScreen = () => {
  const router = useRouter();
  const { show } = useToast();
  const { colors } = useTheme();
  const pendingVerification = useAuthStore((state) => state.pendingVerification);
  const requestOtp = useAuthStore((state) => state.requestOtp);
  const verifyPendingOtp = useAuthStore((state) => state.verifyPendingOtp);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { secondsRemaining, canResend, reset } = useOtpTimer(30);

  const form = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = form.watch("otp");

  const submit = form.handleSubmit(async ({ otp }) => {
    try {
      await verifyPendingOtp(otp);
      show({
        title: "OTP verified",
        description: "Your account is now ready to use.",
        variant: "success",
      });
      router.replace(PROTECTED_HOME_ROUTE);
    } catch (error) {
      show({
        title: "Verification failed",
        description: getFirebaseErrorMessage(error),
        variant: "error",
      });
    }
  });

  return (
    <AuthScreenLayout
      title="Enter verification code"
      subtitle={`We sent a 6-digit OTP to ${pendingVerification?.phoneNumber ?? "your mobile number"}.`}
      footer={
        <View className="items-center gap-3">
          <Text size="sm" tone="secondary">
            Wrong number?
          </Text>
          <Text size="sm" weight="semibold" style={{ color: colors.primary }} onPress={() => router.replace(AUTH_HOME_ROUTE)}>
            Change mobile number
          </Text>
        </View>
      }
    >
      <View className="gap-5">
        <Controller
          control={form.control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <OTPInput value={value} onChange={onChange} error={form.formState.errors.otp?.message} />
          )}
        />

        <View className="items-center gap-2">
          <Text size="sm" tone="secondary">
            Didn&apos;t receive the code?
          </Text>
          {canResend ? (
            <Text
              size="sm"
              weight="semibold"
              style={{ color: colors.primary }}
              onPress={async () => {
                if (!pendingVerification) {
                  return;
                }

                try {
                  await requestOtp(pendingVerification.phoneNumber);
                  reset();
                  show({
                    title: "OTP resent",
                    description: "A fresh code has been sent to your number.",
                    variant: "success",
                  });
                } catch (error) {
                  show({
                    title: "Unable to resend OTP",
                    description: getFirebaseErrorMessage(error),
                    variant: "error",
                  });
                }
              }}
            >
              Resend OTP
            </Text>
          ) : (
            <Text size="sm" weight="medium">
              Resend in 00:{String(secondsRemaining).padStart(2, "0")}
            </Text>
          )}
        </View>

        <AuthButton
          label="Verify OTP"
          onPress={() => void submit()}
          isLoading={isLoading}
          disabled={otpValue.length !== 6 || !pendingVerification}
        />
      </View>
    </AuthScreenLayout>
  );
};
