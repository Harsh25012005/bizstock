import { View } from "react-native";

import { useTheme } from "@/hooks";

export const Divider = () => {
  const { colors } = useTheme();

  return <View style={{ height: 1, backgroundColor: colors.border }} />;
};
