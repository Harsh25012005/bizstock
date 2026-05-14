import { useEffect, useRef } from "react";
import { Pressable, TextInput, View } from "react-native";

import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  autoFocus?: boolean;
}

export const OTPInput = ({ value, onChange, length = 6, error, autoFocus = true }: OTPInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const { colors, isDark, radius } = useTheme();
  const safeValue = value.slice(0, length);

  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    const timeout = setTimeout(() => inputRef.current?.focus(), 180);
    return () => clearTimeout(timeout);
  }, [autoFocus]);

  return (
    <View className="gap-3">
      <Pressable onPress={() => inputRef.current?.focus()}>
        <View className="flex-row items-center justify-between gap-2">
          {Array.from({ length }).map((_, index) => {
            const digit = safeValue[index] ?? "";
            const isActive = index === safeValue.length && safeValue.length < length;

            return (
              <View
                key={index}
                className="flex-1 items-center justify-center border"
                style={{
                  height: 64,
                  borderRadius: radius.xl,
                  backgroundColor: isDark ? "#17171A" : "#F8F8FA",
                  borderColor: error ? colors.danger : isActive || digit ? colors.primary : colors.border,
                }}
              >
                <Text size="xl" weight="bold">
                  {digit}
                </Text>
              </View>
            );
          })}
        </View>
      </Pressable>

      <TextInput
        ref={inputRef}
        value={safeValue}
        onChangeText={(nextValue) => onChange(nextValue.replace(/\D/g, "").slice(0, length))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        importantForAutofill="yes"
        style={{
          position: "absolute",
          opacity: 0.01,
          width: 1,
          height: 1,
        }}
      />

      {error ? <Text size="sm" tone="danger">{error}</Text> : null}
    </View>
  );
};
