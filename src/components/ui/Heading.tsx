import { Text, TextProps } from "@/components/ui/Text";

interface HeadingProps extends Omit<TextProps, "weight" | "size"> {
  level?: 1 | 2 | 3 | 4;
}

const levelMap = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "lg",
} as const;

export const Heading = ({ level = 2, ...props }: HeadingProps) => {
  return <Text size={levelMap[level]} weight="bold" {...props} />;
};
