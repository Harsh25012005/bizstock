import type { StateStorage } from "zustand/middleware";

import { mmkv } from "@/services/storage/mmkv";

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    mmkv.set(name, value);
  },
  getItem: (name) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    mmkv.delete(name);
  },
};
