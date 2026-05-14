import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
        refetchOnReconnect: true,
        networkMode: "offlineFirst",
      },
      mutations: {
        retry: 1,
        networkMode: "offlineFirst",
      },
    },
  });
