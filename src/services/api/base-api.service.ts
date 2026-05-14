import type { ApiResult } from "@/types";

export abstract class BaseApiService {
  protected resolveNetworkResult<TData>(data: TData): ApiResult<TData> {
    return {
      data,
      source: "network",
    };
  }

  protected resolveCacheResult<TData>(data: TData): ApiResult<TData> {
    return {
      data,
      source: "cache",
    };
  }
}
