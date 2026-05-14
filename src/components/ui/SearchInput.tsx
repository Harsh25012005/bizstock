import { Input, InputProps } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

export const SearchInput = (props: Omit<InputProps, "leftAccessory">) => {
  return (
    <Input
      placeholder="Search"
      leftAccessory={
        <Text size="lg" tone="secondary">
          {"\u2315"}
        </Text>
      }
      returnKeyType="search"
      {...props}
    />
  );
};
