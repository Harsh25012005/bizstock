import * as SecureStore from "expo-secure-store";

export const secureStoreService = {
  setItem: (key: string, value: string) =>
    SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    }),
  getItem: (key: string) => SecureStore.getItemAsync(key),
  deleteItem: (key: string) => SecureStore.deleteItemAsync(key),
};
