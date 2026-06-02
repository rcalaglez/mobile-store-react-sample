import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const ONE_HOUR = 1000 * 60 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR,
      gcTime: ONE_HOUR,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function setupQueryPersistence() {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: "itx-query-cache",
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: ONE_HOUR,
  });
}