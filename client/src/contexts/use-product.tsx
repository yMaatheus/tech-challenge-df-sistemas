import type { IProduct } from "@/common";
import type { ProductSubmit } from "@/components/app/product-form";
import { createProduct } from "@/services/create-product";
import { deleteProduct } from "@/services/delete-product";
import { updateProduct } from "@/services/update-product";
import { createContext, useContext, type PropsWithChildren } from "react";
import { toast } from "sonner";

export interface ContextType {
  handleCreateProduct: (product: ProductSubmit) => Promise<IProduct | null>;
  handleUpdateProduct: (product: ProductSubmit) => Promise<IProduct | null>;
  handleDeleteProduct: (productId: string) => Promise<boolean>;
}

export const ProductContext = createContext({} as ContextType);

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const ProductProvider = ({ children }: PropsWithChildren) => {
  async function handleCreateProduct(product: ProductSubmit) {
    try {
      const promise = createProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      });

      toast.promise(promise, {
        loading: "Carregando...",
        success: "Produto criado com sucesso.",
      });

      return promise;
    } catch (error) {
      toast.error("Não foi possível criar o produto. Tente novamente.");
    }
    return null
  }

  async function handleUpdateProduct(product: ProductSubmit) {
    try {
      if (!product.id) throw Error('ProductId not found')

      const promise = updateProduct(product.id, {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      });

      toast.promise(promise, {
        loading: "Carregando...",
        success: "Produto atualizado com sucesso.",
      });

      return promise;
    } catch (error) {
      toast.error("Não foi possível editar o produto. Tente novamente.");
    }
    return null;
  }

  async function handleDeleteProduct(productId: string) {
    try {
      const promise = deleteProduct(productId);

      toast.promise(promise, {
        loading: "Carregando...",
        success: "Produto removido com sucesso.",
      });

      return promise;
    } catch (error) {
      toast.error("Não foi possível remover a produto. Tente novamente.");
    }
    return false;
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
