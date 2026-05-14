import { View } from "react-native";

import { FullScreenLoader } from "@/components/ui/loader/FullScreenLoader";
import { InlineLoader } from "@/components/ui/loader/InlineLoader";

export interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
  inline?: boolean;
}

export const Loader = ({ label, fullScreen = false, inline = false }: LoaderProps) => {
  if (fullScreen) {
    return <FullScreenLoader label={label} />;
  }

  if (inline) {
    return <InlineLoader label={label} />;
  }

  return (
    <View className="items-center justify-center py-6">
      <InlineLoader label={label} />
    </View>
  );
};
