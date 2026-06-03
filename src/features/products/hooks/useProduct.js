import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/api/products";
import { queryKeys } from "@/lib/queryKeys";

export function useProduct(id) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });
}