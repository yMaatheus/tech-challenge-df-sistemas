import { ProductProvider } from "@/contexts/use-product";
import { Outlet } from "react-router";

export function ProductLayout() {
  return(
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  )
}