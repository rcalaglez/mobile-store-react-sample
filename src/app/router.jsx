import App from "@/App";
import { Routes, Route } from "react-router";
import ProductListPage from "@/features/products/pages/ProductListPage";

export default function AppRouter() {
  return (
<Routes>
      <Route element={<App />}>
        <Route index element={<ProductListPage />} />
      </Route>
    </Routes>
  );
}