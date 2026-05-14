import { STORAGE_KEYS } from "@/constants";
import { mmkv } from "@/services/storage";
import type { SyncJob } from "@/types";

export const offlineQueueService = {
  getAll: () => {
    const raw = mmkv.getString(STORAGE_KEYS.syncQueue);
    return raw ? (JSON.parse(raw) as SyncJob[]) : [];
  },
  enqueue: (job: SyncJob) => {
    const queue = offlineQueueService.getAll();
    mmkv.set(STORAGE_KEYS.syncQueue, JSON.stringify([...queue, job]));
  },
  clear: () => {
    mmkv.delete(STORAGE_KEYS.syncQueue);
  },
};
