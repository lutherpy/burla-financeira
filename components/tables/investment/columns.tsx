// columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { investmentSimulation } from "@/db/schema";

export const columns: ColumnDef<investmentSimulation>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "bank",
    header: "Banco",
  },
  {
    accessorKey: "accountNumber",
    header: "Conta",
  },
  {
    accessorKey: "province",
    header: "Província",
  },
  {
    accessorKey: "age",
    header: "Idade",
  },
  {
    accessorKey: "amount",
    header: "Montante",
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return new Date(value).toLocaleDateString("pt-AO");
    },
  },
];
