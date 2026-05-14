import { FullScreenLoader as UIFullScreenLoader } from "@/components/ui/loader";

export const FullScreenLoader = ({ label }: { label?: string }) => {
  return <UIFullScreenLoader label={label} />;
};
