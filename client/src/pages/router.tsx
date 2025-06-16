import { ProductLayout, ProductsPage } from "@/pages/products";
import { DetailsProductPage } from "@/pages/products/details";
import { Navigate, Route, Routes } from "react-router";


export function Router() {
  return (
    <Routes>
      <Route index element={<Navigate to="/products" />} />
      
      <Route path="products" element={<ProductLayout />}>
        <Route index element={<ProductsPage />} />
        <Route path=":productId" element={<DetailsProductPage />} />
      </Route>
    </Routes>
  );
}
