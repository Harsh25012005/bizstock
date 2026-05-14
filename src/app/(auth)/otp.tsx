import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { Button, Input, PlaceholderCard, ScreenWrapper } from "@/components";
import { PROTECTED_HOME_ROUTE } from "@/constants";
import { useToast } from "@/hooks";
import { otpSchema, type OtpSchema } from "@/schemas";
import { useAuthStore } from "@/store";

export default function OtpScreen() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
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

  const onSubmit = handleSubmit(async () => {
    setSession({
      userId: "demo-user",
      phoneNumber: "+91 99999 99999",
    });
    show({
      title: "Protected shell unlocked",
      description: "This uses local placeholder auth state so the navigation foundation can be exercised.",
      variant: "success",
    });
    router.replace(PROTECTED_HOME_ROUTE);
  });

  return (
    <ScreenWrapper
      title="OTP verification"
      subtitle="The confirmation flow is scaffolded and ready for future Firebase phone auth wiring."
    >
      <View className="gap-4">
        <PlaceholderCard title="Verify code" subtitle="Placeholder logic only">
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
            <Button label="Continue" onPress={onSubmit} isLoading={isSubmitting} />
          </View>
        </PlaceholderCard>
        <Text className="text-sm leading-6 text-ink-500">
          Replace the placeholder submit handler with your verification use case later. The rest of the
          screen contract can stay stable.
        </Text>
      </View>
    </ScreenWrapper>
  );
}
