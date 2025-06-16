import { useEffect, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import type { IReview } from "@/common";
import { z } from "zod";

const reviewSchema = z.object({
  author: z.string().min(3, "Nome do autor deve ter pelo menos 3 caracteres"),
  rating: z.coerce.number().min(1).max(5, "Nota deve ser entre 1 e 5"),
  comment: z.string().min(5, "Comentário deve ter pelo menos 5 caracteres"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

export type ReviewSubmit = {
  productId: string;
  author: string;
  rating: number;
  comment: string;
}

interface Props {
  productId: string;
  review?: IReview;
  submit: (review: ReviewSubmit) => Promise<IReview | null>;
  triggerBtn: ReactNode;
}

export function ReviewForm({ productId, review, submit, triggerBtn }: Props) {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      author: "",
      rating: 5,
      comment: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (review) {
      form.reset({
        author: review.author,
        rating: review.rating,
        comment: review.comment,
      });
    } else {
      form.reset({
        author: "",
        rating: 5,
        comment: "",
      });
    }
  }, [review, form]);

  async function onSubmit(values: ReviewFormData) {
    try {
      await submit({
        productId,
        ...values
      });
      form.reset();
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {review ? "Editar Avaliação" : "Nova Avaliação"}
          </DialogTitle>
          <DialogDescription>
            {review
              ? "Edite as informações da avaliação existente."
              : "Preencha as informações para criar uma nova avaliação."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Nota</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                      className="flex space-x-1"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={value.toString()}
                              id={`nota-${value}`}
                              className="sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`nota-${value}`}
                            className="cursor-pointer p-0"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                Number.parseInt(field.value.toString()) >= value
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentário</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escreva seu comentário sobre o produto"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
