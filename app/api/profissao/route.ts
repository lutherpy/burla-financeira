import { db } from "@/db/drizzle";
import { investmentSimulation } from "@/db/schema"; // ajuste o caminho conforme seu schema
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .selectDistinct({ profissao: investmentSimulation.profissao })
      .from(investmentSimulation)
      .orderBy(asc(investmentSimulation.profissao));

    // extrair somente valores válidos
    const profissoes = rows
      .map((r) => r.profissao)
      .filter((p): p is string => Boolean(p));

    return NextResponse.json({ data: profissoes });
  } catch (error) {
    console.error("Erro ao buscar profissões:", error);
    return NextResponse.json(
      { error: "Erro ao buscar profissões" },
      { status: 500 }
    );
  }
}
