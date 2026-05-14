import { useToastStore } from "@/store";

export const useToast = () => {
  const show = useToastStore((state) => state.show);
  const dismiss = useToastStore((state) => state.dismiss);

  return {
    show,
    dismiss,
  };
};
