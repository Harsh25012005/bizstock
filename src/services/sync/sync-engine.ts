import { offlineQueueService } from "@/services/sync/offline-queue.service";
import { logger } from "@/utils";

export const syncEngine = {
  bootstrap: async () => {
    logger.info("Sync engine prepared", {
      queuedJobs: offlineQueueService.getAll().length,
    });
  },
};
