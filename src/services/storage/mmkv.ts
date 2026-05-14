import { MMKV } from "react-native-mmkv";

import { logger } from "@/utils";

type StorageAdapter = {
  set: (key: string, value: string) => void;
  getString: (key: string) => string | undefined;
  delete: (key: string) => void;
};

const createFallbackStorage = (): StorageAdapter => {
  const memoryStore = new Map<string, string>();

  logger.warn(
    "MMKV native module is unavailable. Falling back to in-memory storage until the dev client is rebuilt.",
  );

  return {
    set: (key, value) => {
      memoryStore.set(key, value);
    },
    getString: (key) => {
      return memoryStore.get(key);
    },
    delete: (key) => {
      memoryStore.delete(key);
    },
  };
};

const createStorage = (): StorageAdapter => {
  try {
    return new MMKV({
      id: "bizstock-mmkv",
    });
  } catch (error) {
    logger.warn("Failed to initialize MMKV. Continuing with fallback storage.", error);
    return createFallbackStorage();
  }
};

export const mmkv = createStorage();
