"use client";
import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/db/schema";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "cargo",
    header: "Cargo",
  },
  {
    accessorKey: "sigla",
    header: "Departamento",
  },
  {
    accessorKey: "emailLider",
    header: "Líder",
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
  },
  {
    accessorKey: "updatedAt",
    header: "Data de Atualização",
  },
];
