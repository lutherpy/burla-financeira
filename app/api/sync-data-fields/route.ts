// /app/api/sync-fields/route.ts
import { NextRequest, NextResponse } from "next/server";
import { syncExtraMicrosoftFields } from "@/lib/syncExtraMicrosoftFields";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log(
      "[/api/sync-fields] Requisição recebida para sincronizar campos extras:",
      email
    );

    if (!email) {
      return NextResponse.json(
        { error: "E-mail é obrigatório" },
        { status: 400 }
      );
    }

    await syncExtraMicrosoftFields(email);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/sync-fields] Erro:", err);
    return NextResponse.json(
      { error: "Erro ao sincronizar campos." },
      { status: 500 }
    );
  }
}
