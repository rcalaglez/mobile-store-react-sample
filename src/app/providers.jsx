import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { queryClient } from "@/lib/queryClient";
import AppRouter from "@/app/router";

export default function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </QueryClientProvider>
  );
}