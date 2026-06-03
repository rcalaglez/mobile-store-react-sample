import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { queryClient } from "@/lib/queryClient";
import AppRouter from "@/app/router";
import CartProvider from "@/features/cart/context/CartProvider";

export default function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}