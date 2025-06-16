import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { IProduct } from "@/common";
import { ProductForm } from "@/components/app/product-form";
import { ProductListEmpty } from "@/components/app/product-list-empty";
import { DeleteProductAlertDialog } from "@/components/app/delete-product-alert-dialog/delete-product-alert-dialog";

export function ProductListTable({ products }: { products?: IProduct[]}) {
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
                    console.log("create product: ", product);
                  }}
                  triggerBtn={
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  }
                />

                <DeleteProductAlertDialog product={product} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
