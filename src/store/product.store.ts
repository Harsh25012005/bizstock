import { create } from "zustand";

interface ProductStoreState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
