import { apiClient } from "@/api/client";
import { filterProductsWithPrice } from "@/api/filterProductsWithPrice";
import { normalizeProduct } from "@/api/normalizeProduct";

export function getProducts() {
  return apiClient.request("/api/product").then(filterProductsWithPrice);
}

export function getProductById(id) {
  return apiClient.request(`/api/product/${id}`).then(normalizeProduct);
}