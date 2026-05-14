import { ReactNode, useRef } from "react";
import { Animated, TextInput, TextInputProps, View } from "react-native";

import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";

export interface AuthInputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
}

export const AuthInput = ({
  label,
  hint,
  error,
  leftAccessory,
  rightAccessory,
  style,
  editable = true,
  onFocus,
  onBlur,
  multiline,
  ...props
}: AuthInputProps) => {
  const { colors, isDark, radius, spacing, typography } = useTheme();
  const border = useRef(new Animated.Value(0)).current;

  const animate = (value: number) => {
    Animated.timing(border, {
      toValue: value,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = border.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? colors.danger : colors.border, colors.primary],
  });

  return (
    <View className="w-full gap-2">
      {label ? <Label>{label}</Label> : null}
      <Animated.View
        className="flex-row gap-3 px-4"
        style={{
          borderRadius: multiline ? radius.xl : radius.full,
          borderWidth: 1,
          borderColor,
          minHeight: multiline ? 140 : 56,
          alignItems: multiline ? "flex-start" : "center",
          paddingVertical: multiline ? 14 : 0,
          backgroundColor: isDark ? "#17171A" : "#F8F8FA",
          opacity: editable ? 1 : 0.6,
        }}
      >
        {leftAccessory}
        <TextInput
          editable={editable}
          multiline={multiline}
          placeholderTextColor={colors.placeholder}
          onFocus={(event) => {
            animate(1);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            animate(0);
            onBlur?.(event);
          }}
          style={[
            {
              flex: 1,
              color: colors.text,
              fontSize: typography.fontSize.base,
              lineHeight: typography.lineHeight.base,
              fontFamily: typography.fontFamily.regular,
              fontWeight: typography.fontWeight.regular,
              paddingVertical: multiline ? spacing[1] : spacing[4],
              textAlignVertical: multiline ? "top" : "center",
              minHeight: multiline ? 112 : undefined,
            },
            style,
          ]}
          {...props}
        />
        {rightAccessory}
      </Animated.View>
      {error || hint ? (
        <Text size="sm" tone={error ? "danger" : "secondary"}>
          {error ?? hint}
        </Text>
      ) : null}
    </View>
  );
};
