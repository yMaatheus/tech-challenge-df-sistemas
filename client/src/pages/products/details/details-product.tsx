import { FetchStatus, type IProduct, type IReview } from "@/common";
import { DeleteAlertDialog } from "@/components/app/delete-alert-dialog";
import { Header } from "@/components/app/header";
import { ProductAboutDetails } from "@/components/app/product-about-details";
import { ProductForm } from "@/components/app/product-form";
import { ReviewForm, type ReviewSubmit } from "@/components/app/review-form";
import { ReviewsList } from "@/components/app/reviews-list/reviews-list";
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
import { createReview } from "@/services/create-review";
import { fetchProductById } from "@/services/fetch-product-by-id";
import { fetchReviewsByProductId } from "@/services/fetch-reviews-by-product";
import {
  getReviewsAverage,
  type getReviewsAverageResponse,
} from "@/services/get-reviews-average";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export function DetailsProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { handleUpdateProduct, handleDeleteProduct } = useProduct();
  const {
    status,
    data: product,
    refetch,
  } = useFetch<IProduct, string>({
    callback: fetchProductById,
    params: productId!,
  });
  const { data: reviewsAverage } = useFetch<getReviewsAverageResponse, string>({
    callback: getReviewsAverage,
    params: productId!,
  });
  const fetchReviews = useFetch<IReview[], string>({
    callback: fetchReviewsByProductId,
    params: productId!,
  });

  const average = reviewsAverage?.average;

  if (!product && status !== FetchStatus.LOADING) {
    return <Navigate to="/products" />;
  }

  async function handleCreateReview(data: ReviewSubmit) {
    try {
      const promise = createReview({
        productId: data.productId,
        author: data.author,
        rating: data.rating,
        comment: data.comment,
      });

      toast.promise(promise, {
        loading: "Carregando...",
        success: "Avaliação publicada com sucesso.",
      });

      return promise;
    } catch (error) {
      toast.error("Não foi possível publicar uma avaliação. Tente novamente.");
    }
    return null;
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
          <ProductForm
            product={product}
            submit={async (product) => {
              const result = await handleUpdateProduct(product);
              await refetch();

              return result;
            }}
            triggerBtn={
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                Editar Produto
              </Button>
            }
          />

          <DeleteAlertDialog
            title="Excluir produto"
            description={`Tem certeza que deseja excluir o produto "${product?.name}"? Esta ação não pode ser desfeita e todas as avaliações associadas também serão excluídas.`}
            onClick={async () => {
              await handleDeleteProduct(productId!);
              navigate("/products");
            }}
            triggerBtn={
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir Produto
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-6">
        <ProductAboutDetails product={product} reviewsAverage={average} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Avaliações</CardTitle>
              <CardDescription>
                Avaliações dos clientes sobre este produto
              </CardDescription>
            </div>

            <ReviewForm
              productId={productId!}
              submit={async (data) => {
                const result = await handleCreateReview(data);
                await fetchReviews.refetch();

                return result;
              }}
              triggerBtn={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Avaliação
                </Button>
              }
            />
          </CardHeader>

          <CardContent>
            <ReviewsList fetchReviews={fetchReviews} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
