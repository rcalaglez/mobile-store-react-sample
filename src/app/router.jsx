import App from "@/App";
import { Routes, Route } from "react-router";
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";

export default function AppRouter() {
  return (
<Routes>
      <Route element={<App />}>
        <Route index element={<ProductListPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}