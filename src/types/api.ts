export interface ApiResult<TData> {
  data: TData;
  source: "cache" | "network";
}
