import { ReactNode } from "react";
import { Pressable, PressableProps, View } from "react-native";

import { renderButtonAccessory } from "@/components/ui/button-accessory";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";
import { cn } from "@/utils";

export interface FABProps extends Omit<PressableProps, "style"> {
  icon: ReactNode;
  label?: string;
}

export const FAB = ({ icon, label, className, ...props }: FABProps) => {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      className={cn("absolute bottom-6 right-4 flex-row items-center gap-2.5 border px-6 py-4", className)}
      style={{
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        borderColor: colors.primary,
      }}
      {...props}
    >
      <View>{renderButtonAccessory(icon, "inverse", "#FFFFFF")}</View>
      {label ? (
        <Text tone="inverse" weight="semibold">
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};
