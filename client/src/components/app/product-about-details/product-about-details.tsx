import type { IProduct } from "@/common";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Star } from "lucide-react";

export function ProductAboutDetails({
  product,
  reviewsAverage,
}: {
  product?: IProduct;
  reviewsAverage?: number;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl">{product?.name}</CardTitle>
            <CardDescription>
              Categoria: <Badge variant="outline">{product?.category}</Badge>
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              R$ {product?.price.toFixed(2)}
            </div>

            {reviewsAverage && (
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(reviewsAverage)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1">({reviewsAverage.toFixed(1)})</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Descrição</h3>
            <p className="w-2/3 text-muted-foreground">{product?.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <h3 className="font-medium mb-1">ID do Produto</h3>
              <p className="text-sm text-muted-foreground truncate">{product?._id}</p>
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
  );
}
