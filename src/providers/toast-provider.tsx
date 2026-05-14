import { PropsWithChildren, useEffect } from "react";
import { Pressable, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks";
import { useToastStore } from "@/store";

const ToastHost = () => {
  const { colors } = useTheme();
  const items = useToastStore((state) => state.items);
  const dismiss = useToastStore((state) => state.dismiss);

  useEffect(() => {
    const timers = items.map((item) =>
      setTimeout(() => {
        dismiss(item.id);
      }, 2500),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [dismiss, items]);

  return (
    <View pointerEvents="box-none" className="absolute left-0 right-0 top-14 z-50 px-4">
      {items.map((item) => (
        <View key={item.id} className="mb-3">
          <Pressable onPress={() => dismiss(item.id)}>
            <Card
              elevated
              style={{
                borderColor:
                  item.variant === "success"
                    ? colors.success
                    : item.variant === "error"
                      ? colors.danger
                      : colors.info,
              }}
            >
              <Text weight="semibold">{item.title}</Text>
              {item.description ? (
                <Text className="mt-1" size="sm" tone="secondary">
                  {item.description}
                </Text>
              ) : null}
            </Card>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ToastHost />
    </>
  );
};
