import { Button } from "@/components/ui/button";
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
import type { IProduct } from "@/common";
import { ProductForm } from "@/components/app/product-form";
import { ProductListEmpty } from "@/components/app/product-list-empty";
import { useProduct } from "@/contexts/use-product";
import { DeleteAlertDialog } from "@/components/app/delete-alert-dialog";

interface Props {
  products?: IProduct[];
  refetch: () => Promise<void>;
}

export function ProductListTable({ products, refetch }: Props) {
  const { handleUpdateProduct, handleDeleteProduct } = useProduct();

  return (
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
        {products?.length === 0 ? (
          <ProductListEmpty />
        ) : (
          products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.createdAt &&
                  format(new Date(product.createdAt), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <Link to={`/products/${product._id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalhes</span>
                  </Link>
                </Button>

                <ProductForm
                  product={product}
                  submit={async (product) => {
                    const result = await handleUpdateProduct(product);
                    await refetch();

                    return result;
                  }}
                  triggerBtn={
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  }
                />

                <DeleteAlertDialog
                  title="Excluir produto"
                  description={`Tem certeza que deseja excluir o produto "${product?.name}"? Esta ação não pode ser desfeita e todas as avaliações associadas também serão excluídas.`}
                  onClick={async () => {
                    await handleDeleteProduct(product._id);
                    await refetch();
                  }}
                  triggerBtn={
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
