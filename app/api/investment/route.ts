import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { investmentSimulation } from "@/db/schema";
import { z } from "zod";
import { getListHandler } from "@/lib/handlers/getListHandler";

// Schema de validação Zod
const simulationSchema = z.object({
  name: z.string().min(2),
  bank: z.string().min(2),
  accountNumber: z.string().min(2),
  province: z.string().min(2),
  age: z.coerce.number().min(18),
  amount: z.coerce.number().min(1), // <- ainda como número aqui
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Valida os dados recebidos
    const parsed = simulationSchema.parse(body);

    // Converte `amount` para string
    await db.insert(investmentSimulation).values({
      name: parsed.name,
      bank: parsed.bank,
      accountNumber: parsed.accountNumber,
      province: parsed.province,
      age: parsed.age,
      amount: parsed.amount.toString(), // 👈 necessário
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Erro de validação", issues: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao salvar dados de investimento" },
      { status: 500 }
    );
  }
}

export const GET = getListHandler(investmentSimulation, {
  name: investmentSimulation.name,
  bank: investmentSimulation.bank,
  accountNumber: investmentSimulation.accountNumber,
  province: investmentSimulation.province,
  age: investmentSimulation.age,
  amount: investmentSimulation.amount,
  createdAt: investmentSimulation.createdAt,
});
