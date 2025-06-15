import { UserNav } from "@/components/app/user-nav";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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

export function ProductsPage() {
  const { isLoading, data: products } = useFetch<IProduct>({
    callback: fetchProducts,
  });

  return (
    <div className="min-h-screen bg-background p-5 flex flex-col gap-8">
      <header className="bg-card text-card-foreground flex justify-between gap-6 rounded-xl border px-3 py-6 shadow-sm">
        <section className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
          <CardTitle className="text-foreground">Produtos</CardTitle>
          <CardDescription className="text-muted-foreground">
            Gerencie os produtos da sua loja
          </CardDescription>
        </section>

        <UserNav />
      </header>

      <Card className="min-h-96">
        <CardHeader>
          <CardTitle className="text-foreground">
            Listagem de Produtos
          </CardTitle>
          <CardDescription>
            Gerencie os produtos disponíveis na sua loja.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((produto) => (
                    <TableRow key={produto._id}>
                      <TableCell className="font-medium">
                        {produto.name}
                      </TableCell>
                      <TableCell>R$ {produto.price.toFixed(2)}</TableCell>
                      <TableCell>{produto.category}</TableCell>
                      <TableCell>
                        {produto.createdAt &&
                          format(new Date(produto.createdAt), "dd/MM/yyyy", {
                            locale: ptBR,
                          })}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/produtos/${produto._id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          // onClick={() => openEditModal(produto)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Excluir produto
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o produto "
                                {produto.name}"? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                // onClick={() => deleteProduct(produto._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
