import { Pressable } from "react-native";
import { useState } from "react";

import { Text } from "@/components/ui/Text";

import { AuthInput, type AuthInputProps } from "./AuthInput";

export const PasswordInput = (props: Omit<AuthInputProps, "secureTextEntry" | "rightAccessory">) => {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      {...props}
      secureTextEntry={!visible}
      autoCapitalize="none"
      autoCorrect={false}
      rightAccessory={
        <Pressable hitSlop={10} onPress={() => setVisible((current) => !current)}>
          <Text size="sm" weight="semibold" style={{ color: "#F97316" }}>
            {visible ? "Hide" : "Show"}
          </Text>
        </Pressable>
      }
    />
  );
};
