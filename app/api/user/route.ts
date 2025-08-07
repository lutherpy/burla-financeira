import { db } from "@/db/drizzle";
import { user } from "@/db/schema"; // importa o schema da tabela user
import { getListHandler } from "@/lib/handlers/getListHandler";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/user
export const GET = getListHandler(user, {
  id: user.id,
  name: user.name,
  email: user.email,
  sigla: user.sigla,
  jobTitle: user.cargo,
  lider: user.manager,
  emailLider: user.emailLider,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const existingUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return NextResponse.json({ exists: existingUser.length > 0 });
  } catch (error) {
    console.error("Erro ao verificar e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
