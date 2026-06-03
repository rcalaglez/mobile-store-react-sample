import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/features/cart/api/carts";
import useCart from "@/features/cart/hooks/useCart";

export default function useAddToCart() {
  const { setCount } = useCart();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log("Added to cart", data);
      setCount(data.count);
    },
  });
}