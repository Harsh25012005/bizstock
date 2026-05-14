import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { View } from "react-native";

import { Button, Card, Input, PlaceholderCard, ScreenWrapper, Text } from "@/components";
import { checkFirestoreConnection, getFirebaseErrorMessage, isFirebaseReady } from "@/firebase";
import { loginSchema, type LoginSchema } from "@/schemas";
import { useToast } from "@/hooks";
import { useAuthStore } from "@/store";

type DatabaseStatus = {
  tone: "success" | "danger";
  title: string;
  description: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { show } = useToast();
  const requestOtp = useAuthStore((state) => state.requestOtp);
  const [isCheckingDatabase, setIsCheckingDatabase] = useState(false);
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null);
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

  const onSubmit = handleSubmit(async ({ phoneNumber }) => {
    try {
      await requestOtp(phoneNumber);
      show({
        title: "OTP requested",
        description: isFirebaseReady()
          ? "Verification started. Complete the OTP on the next screen."
          : "Running in development fallback mode until Firebase keys and verifier are connected.",
        variant: "success",
      });
      router.push("/(auth)/otp");
    } catch (error) {
      show({
        title: "Unable to start OTP",
        description: getFirebaseErrorMessage(error),
        variant: "error",
      });
    }
  });

  const handleDatabaseCheck = async () => {
    setIsCheckingDatabase(true);
    setDatabaseStatus(null);

    try {
      const result = await checkFirestoreConnection();
      const nextStatus: DatabaseStatus = {
        tone: "success",
        title: "Database connected",
        description: result.message,
      };

      setDatabaseStatus(nextStatus);
      show({
        title: nextStatus.title,
        description: nextStatus.description,
        variant: "success",
      });
    } catch (error) {
      const nextStatus: DatabaseStatus = {
        tone: "danger",
        title: "Database connection failed",
        description: getFirebaseErrorMessage(error),
      };

      setDatabaseStatus(nextStatus);
      show({
        title: nextStatus.title,
        description: nextStatus.description,
        variant: "error",
      });
    } finally {
      setIsCheckingDatabase(false);
    }
  };

  return (
    <ScreenWrapper
      title="Welcome back"
      subtitle="Phone authentication is wired through the Firebase module and can fall back safely in development."
    >
      <View className="gap-4">
        <PlaceholderCard title="Login" subtitle="Request an OTP for Firebase phone authentication">
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
            <View className="items-center pt-1">
              <Button
                label="Check Database Connection"
                variant="outline"
                size="sm"
                fullWidth={false}
                onPress={handleDatabaseCheck}
                isLoading={isCheckingDatabase}
              />
            </View>
            {databaseStatus ? (
              <Card
                className="mt-1"
                style={{
                  borderColor: databaseStatus.tone === "success" ? "#16A34A" : "#DC2626",
                }}
              >
                <Text weight="semibold" tone={databaseStatus.tone}>
                  {databaseStatus.title}
                </Text>
                <Text className="mt-1" size="sm" tone="secondary">
                  {databaseStatus.description}
                </Text>
              </Card>
            ) : null}
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

        <PlaceholderCard title="Authentication notes">
          <View className="gap-3">
            <Input
              label="Flow detail"
              value="Production phone auth still needs an app verifier (reCAPTCHA/native verifier) connected from the screen layer."
              editable={false}
            />
            <Input
              label="Collections created after auth"
              value="users, businesses, products, retailers, orders, payments"
              editable={false}
            />
          </View>
        </PlaceholderCard>
      </View>
    </ScreenWrapper>
  );
}
