import { ReactNode, cloneElement, isValidElement } from "react";

import { Text } from "@/components/ui/Text";

type AccessoryTone = "primary" | "inverse";

interface AccessoryProps {
  color?: string;
  fill?: string;
  stroke?: string;
  style?: unknown;
  tone?: AccessoryTone;
}

export const renderButtonAccessory = (
  accessory: ReactNode,
  tone: AccessoryTone,
  color: string,
) => {
  if (!accessory) {
    return null;
  }

  if (typeof accessory === "string") {
    return (
      <Text tone={tone} weight="semibold">
        {accessory}
      </Text>
    );
  }

  if (isValidElement<AccessoryProps>(accessory)) {
    const existingStyle = accessory.props.style;

    return cloneElement(accessory, {
      color,
      fill: color,
      stroke: color,
      tone,
      style: Array.isArray(existingStyle)
        ? [...existingStyle, { color, fill: color, stroke: color }]
        : [existingStyle, { color, fill: color, stroke: color }],
    });
  }

  return accessory;
};
