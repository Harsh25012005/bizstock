import { ReactNode, forwardRef, useMemo } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

export interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, hint, error, leftAccessory, rightAccessory, className, editable = true, style, ...props }, ref) => {
    const { colors, radius, spacing, typography } = useTheme();
    const helperText = error ?? hint;

    const inputStyle = useMemo(
      () => ({
        color: colors.text,
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.base,
        fontFamily: typography.fontFamily.regular,
        fontWeight: typography.fontWeight.regular,
        minHeight: 52,
        flex: 1,
      }),
      [
        colors.text,
        typography.fontFamily.regular,
        typography.fontSize.base,
        typography.fontWeight.regular,
        typography.lineHeight.base,
      ],
    );

    return (
      <View className="w-full gap-2">
        {label ? <Label>{label}</Label> : null}
        <View
          className={cn("flex-row items-center gap-3 border px-4", !editable && "opacity-60", className)}
          style={{
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderRadius: radius.md,
            minHeight: 52,
          }}
        >
          {leftAccessory}
          <TextInput
            ref={ref}
            editable={editable}
            placeholderTextColor={colors.placeholder}
            style={[inputStyle, style, { paddingVertical: spacing[3] }]}
            {...props}
          />
          {rightAccessory}
        </View>
        {helperText ? (
          <Text size="sm" tone={error ? "danger" : "secondary"}>
            {helperText}
          </Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = "Input";
