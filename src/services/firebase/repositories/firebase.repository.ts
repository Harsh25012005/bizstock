import type { ApiResult } from "@/types";

export abstract class FirebaseRepository<TModel> {
  protected fromCache(data: TModel): ApiResult<TModel> {
    return { data, source: "cache" };
  }

  protected fromNetwork(data: TModel): ApiResult<TModel> {
    return { data, source: "network" };
  }
}
