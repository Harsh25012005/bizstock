import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks";
import type { AppThemeMode } from "@/types";

const modes: AppThemeMode[] = ["light", "dark", "system"];

export const ThemeModeSwitch = () => {
  const { mode, setMode } = useTheme();

  return (
    <View className="flex-row gap-2">
      {modes.map((item) => (
        <Button
          key={item}
          label={item}
          variant={mode === item ? "primary" : "secondary"}
          size="sm"
          fullWidth={false}
          onPress={() => setMode(item)}
        />
      ))}
    </View>
  );
};
