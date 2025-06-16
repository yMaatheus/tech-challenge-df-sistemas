import { TableCell, TableRow } from "@/components/ui/table";

export function ProductListEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center py-4">
        Nenhum produto encontrado
      </TableCell>
    </TableRow>
  );
}
