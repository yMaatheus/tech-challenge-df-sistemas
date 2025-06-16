import { createContext, useContext, type PropsWithChildren } from "react";

export interface ContextType {
  handleDeleteProduct: (productId: string) => Promise<void>;
}

export const ProductContext = createContext({} as ContextType);

export const ProductProvider = ({ children }: PropsWithChildren) => {
  async function handleDeleteProduct(productId: string) {
    console.log('hello world ' + productId);
  }

  const value = {
    handleDeleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
