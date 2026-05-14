import { forwardRef } from "react";
import { TextInput } from "react-native";

import { Input, InputProps } from "@/components/ui/Input";

export const TextArea = forwardRef<TextInput, InputProps>((props, ref) => {
  return <Input ref={ref} multiline textAlignVertical="top" numberOfLines={5} {...props} />;
});

TextArea.displayName = "TextArea";
