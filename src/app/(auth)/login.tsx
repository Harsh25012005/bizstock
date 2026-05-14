import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

import { Button, Input, PlaceholderCard, ScreenWrapper } from "@/components";
import { loginSchema, type LoginSchema } from "@/schemas";
import { useToast } from "@/hooks";

export default function LoginScreen() {
  const router = useRouter();
  const { show } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = handleSubmit(async () => {
    show({
      title: "OTP flow placeholder",
      description: "Firebase phone auth will be connected later without changing this screen shell.",
      variant: "info",
    });
    router.push("/(auth)/otp");
  });

  return (
    <ScreenWrapper
      title="Welcome back"
      subtitle="A clean auth module with form validation, route isolation, and future Firebase integration."
    >
      <View className="gap-4">
        <PlaceholderCard title="Login" subtitle="Business auth foundation only">
          <View className="gap-4">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Phone number"
                  placeholder="Enter mobile number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  error={errors.phoneNumber?.message}
                />
              )}
            />
            <Button label="Request OTP" onPress={onSubmit} isLoading={isSubmitting} />
            {__DEV__ ? (
              <View className="items-center pt-2">
                <Button
                  label="Open Design System"
                  variant="ghost"
                  size="sm"
                  fullWidth={false}
                  onPress={() => router.push("/design-system")}
                />
              </View>
            ) : null}
          </View>
        </PlaceholderCard>

        <PlaceholderCard title="Architecture Notes">
          <Text className="text-base leading-6 text-ink-600">
            This route group is intentionally thin. Validation lives in Zod schemas, form orchestration
            uses React Hook Form, and backend auth details can evolve independently.
          </Text>
        </PlaceholderCard>
      </View>
    </ScreenWrapper>
  );
}
