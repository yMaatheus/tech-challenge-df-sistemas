import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Pencil, Star, Trash2 } from "lucide-react";
import type { FetchStatus, IReview } from "@/common";
import { DeleteAlertDialog } from "@/components/app/delete-alert-dialog";
import { ReviewForm, type ReviewSubmit } from "@/components/app/review-form";
import { toast } from "sonner";
import { useParams } from "react-router";
import { ReviewsListEmpty } from "@/components/app/reviews-list-empty";
import { ReviewsListSkeleton } from "@/components/app/reviews-list-skeleton";
import { updateReview } from "@/services/update-review";
import { deleteReview } from "@/services/delete-review";

interface Props {
  fetchReviews: {
    isLoading: boolean;
    status: FetchStatus;
    data?: IReview[];
    refetch: () => Promise<void>;
  };
}

export function ReviewsList({ fetchReviews }: Props) {
  const { productId } = useParams();
  const { isLoading, data: reviews, refetch } = fetchReviews;

  async function handleDeleteReview(reviewId: string) {
    try {
      const promise = deleteReview(reviewId);

      toast.promise(promise, {
        loading: "Carregando...",
        success: "Avaliação removida com sucesso.",
      });

      return promise;
    } catch (error) {
      toast.error("Não foi possível remover a avaliação. Tente novamente.");
    }
  }

  async function handleUpdateReview(data: ReviewSubmit) {
    try {
      if (!data.id) throw Error("ReviewId not found");

      const promise = updateReview(data.id, {
        author: data.author,
        rating: data.rating,
        comment: data.comment,
      }).then(async (result) => {
        await refetch()

        return result;
      });

      toast.promise(promise, {
        loading: "Carregando...",
        success: "Avaliação atualizada com sucesso.",
      });

      return promise;
    } catch (error) {
      toast.error("Não foi possível editar a avaliação. Tente novamente.");
    }
    return null;
  }

  if (isLoading) {
    return <ReviewsListSkeleton />;
  }

  if (reviews?.length === 0) {
    return <ReviewsListEmpty />;
  }

  return (
    <div className="space-y-4">
      {reviews?.map((review) => (
        <Card key={review._id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                {review.createdAt &&
                  format(new Date(review.createdAt), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
              </div>
            </div>
            <p className="mt-4">{review.comment}</p>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 pt-0">
            <ReviewForm
              productId={productId!}
              submit={handleUpdateReview}
              triggerBtn={
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              }
              review={review}
            />

            <DeleteAlertDialog
              title="Excluir avaliação"
              description="Tem certeza que deseja excluir esta avaliação? Esta ação não
                    pode ser desfeita."
              onClick={() => handleDeleteReview(review._id)}
              triggerBtn={
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              }
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
