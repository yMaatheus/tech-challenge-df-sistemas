import type { ProductSubmit } from "@/components/app/product-form";
import { createContext, useContext, type PropsWithChildren } from "react";

export interface ContextType {
  handleCreateProduct: (product: ProductSubmit) => Promise<void>;
  handleUpdateProduct: (product: ProductSubmit) => Promise<void>;
  handleDeleteProduct: (productId: string) => Promise<void>;
}

export const ProductContext = createContext({} as ContextType);

export const ProductProvider = ({ children }: PropsWithChildren) => {

  async function handleCreateProduct(product: ProductSubmit) {
    console.log('create product: ' + product);
  }

  async function handleUpdateProduct(product: ProductSubmit) {
    console.log('update product: ' + product);
  }

  async function handleDeleteProduct(productId: string) {
    console.log('delete product: ' + productId);
  }

  const value = {
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
