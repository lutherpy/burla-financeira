import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import type { PgTable } from "drizzle-orm/pg-core";
import type { AnyColumn } from "drizzle-orm";

/**
 * Cria um handler GET reutilizável para buscar um registro por ID vindo da rota.
 *
 * @param table Tabela do Drizzle (ex: note)
 * @param idColumn Coluna que representa o ID (ex: note.id)
 */
export function getByIdHandler(table: PgTable, idColumn: AnyColumn) {
  return async function GET(req: NextRequest) {
    // Extrai o último segmento da rota (depois de /api/note/)
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments.pop() || segments.pop(); // pega o último segmento válido

    if (!id) {
      return NextResponse.json(
        { error: "ID não fornecido na URL" },
        { status: 400 }
      );
    }

    try {
      const record = await db
        .select()
        .from(table)
        .where(eq(idColumn, id))
        .limit(1);

      if (!record.length) {
        return NextResponse.json(
          { error: "Registro não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0]);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Erro ao buscar registro" },
        { status: 500 }
      );
    }
  };
}
