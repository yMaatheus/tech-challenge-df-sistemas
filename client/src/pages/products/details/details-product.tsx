import { FetchStatus, type IProduct } from "@/common";
import { Header } from "@/components/app/header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProduct } from "@/contexts/use-product";
import { useFetch } from "@/hooks/use-fetch";
import { fetchProductById } from "@/services/fetch-product-by-id";
import { getReviewsAverage, type getReviewsAverageResponse } from "@/services/get-reviews-average";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";

export function DetailsProductPage() {
  const { productId } = useParams();
  const { handleDeleteProduct } = useProduct();
  const { status, data: product } = useFetch<IProduct, string>({
    callback: fetchProductById,
    params: productId!,
  });
  const { data: reviewsAverage } = useFetch<getReviewsAverageResponse, string>({
    callback: getReviewsAverage,
    params: productId!,
  });

  const average = reviewsAverage?.average;

  if (!product && status !== FetchStatus.LOADING) {
    return <Navigate to="/products" />;
  }

  return (
    <div className="min-h-screen bg-background p-5 flex flex-col gap-8">
      <Header />

      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            // onClick={() => setModalProdutoAberto(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar Produto
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir Produto
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir produto</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir o produto "{product?.name}"?
                  Esta ação não pode ser desfeita e todas as avaliações
                  associadas também serão excluídas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteProduct(product?._id!)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{product?.name}</CardTitle>
                <CardDescription>
                  Categoria:{" "}
                  <Badge variant="outline">{product?.category}</Badge>
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  R$ {product?.price.toFixed(2)}
                </div>

                {average && (
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(average)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1">({average.toFixed(1)})</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-muted-foreground">{product?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="font-medium mb-1">ID do Produto</h3>
                  <p className="text-sm text-muted-foreground">
                    {product?._id}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Data de Criação</h3>
                  <p className="text-sm text-muted-foreground">
                    {product?.createdAt &&
                      format(
                        new Date(product?.createdAt),
                        "dd 'de' MMMM 'de' yyyy",
                        { locale: ptBR },
                      )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Avaliações</CardTitle>
              <CardDescription>
                Avaliações dos clientes sobre este produto
              </CardDescription>
            </div>
            
            <Button
            // onClick={() => setModalAvaliacaoAberto(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Avaliação
            </Button>
          </CardHeader>
          <CardContent>
            {/* <ListaAvaliacoes
              produtoId={id}
              onAvaliacaoModificada={() => {
                carregarMediaAvaliacoes()
              }}
            /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
