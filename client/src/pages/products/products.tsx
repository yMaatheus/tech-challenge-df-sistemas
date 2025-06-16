import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/use-fetch";
import type { IProduct } from "@/common";
import { fetchProducts } from "@/services/fetch-products";
import { Header } from "@/components/app/header";
import { ProductForm } from "@/components/app/product-form";
import { ProductListSkeleton } from "@/components/app/product-list-skeleton";
import { ProductListTable } from "@/components/app/product-list-table";

export function ProductsPage() {
  const { isLoading, data: products } = useFetch<IProduct[]>({
    callback: fetchProducts,
    params: undefined,
  });

  return (
    <div className="min-h-screen bg-background p-5 flex flex-col gap-8">
      <Header />

      <Card className="min-h-96">
        <div className="flex justify-between px-6">
          <CardHeader className="flex-1 px-0">
            <CardTitle className="text-foreground">
              Listagem de Produtos
            </CardTitle>
            <CardDescription>
              Gerencie os produtos disponíveis na sua loja.
            </CardDescription>
          </CardHeader>

          <div className="flex-1 flex justify-end mb-4">
            <ProductForm
              submit={async (product) => {
                console.log("create product: ", product);
              }}
              triggerBtn={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Produto
                </Button>
              }
            />
          </div>
        </div>

        <CardContent>
          {isLoading ? (
            <ProductListSkeleton />
          ) : (
            <ProductListTable products={products} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
