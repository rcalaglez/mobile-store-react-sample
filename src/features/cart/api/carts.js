import { apiClient } from "@/api/client";

export function addToCart({ id, colorCode, storageCode }) {
  return apiClient.request("/api/cart", {
    method: "POST",
    body: JSON.stringify({
      id,
      colorCode,
      storageCode,
    }),
  });
}