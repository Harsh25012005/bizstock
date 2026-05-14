import { FlashList, FlashListProps } from "@shopify/flash-list";

export const AppFlashList = <TItem,>(props: FlashListProps<TItem>) => {
  return <FlashList {...props} />;
};
