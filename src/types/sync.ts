export type SyncJobStatus = "pending" | "running" | "failed" | "completed";

export interface SyncJob<TPayload = unknown> {
  id: string;
  type: string;
  payload: TPayload;
  createdAt: string;
  retries: number;
  status: SyncJobStatus;
}
