import { apiClient } from "@/api/client";
import { filterProductsWithPrice } from "@/api/filterProductsWithPrice";

export function getProducts() {
  return apiClient.request("/api/product").then(filterProductsWithPrice);
}
