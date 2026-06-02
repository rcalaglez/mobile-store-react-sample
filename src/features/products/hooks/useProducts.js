import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/products/api/products";
import { queryKeys } from "@/lib/queryKeys";

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: getProducts,
  });
}