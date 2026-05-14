import { create } from "zustand";

type ToastVariant = "info" | "success" | "error";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastStoreState {
  items: ToastItem[];
  show: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastStoreState>((set) => ({
  items: [],
  show: (toast) =>
    set((state) => ({
      items: [...state.items, { ...toast, id: `${Date.now()}-${Math.random()}` }],
    })),
  dismiss: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
