import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/features/cart/api/carts";
import useCart from "@/features/cart/hooks/useCart";

export default function useAddToCart() {
  const { setCount } = useCart();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      setCount(data.count);
    },
    onError: (error) => {
      console.error("Add to cart failed:", error);
    },
  });
}
