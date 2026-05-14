import { create } from "zustand";

interface OrderStoreState {
  selectedOrderId: string | null;
  setSelectedOrderId: (orderId: string | null) => void;
}

export const useOrderStore = create<OrderStoreState>((set) => ({
  selectedOrderId: null,
  setSelectedOrderId: (selectedOrderId) => set({ selectedOrderId }),
}));
