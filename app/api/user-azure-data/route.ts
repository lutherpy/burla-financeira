// /app/api/user/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/getAccessToken";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Parâmetro 'email' é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const token = await getAccessToken();

    // Buscar o utilizador
    const userRes = await fetch(
      `https://graph.microsoft.com/v1.0/users?$filter=mail eq '${email}'&$select=displayName,userPrincipalName,mail,jobTitle,department,id,givenName,surname,mobilePhone,businessPhones,onPremisesExtensionAttributes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!userRes.ok) {
      const error = await userRes.text();
      return NextResponse.json({ error }, { status: userRes.status });
    }

    const userData = await userRes.json();
    const user = userData.value?.[0];

    if (!user) {
      return NextResponse.json(
        { error: "Utilizador não encontrado." },
        { status: 404 }
      );
    }

    // Buscar manager
    let managerName = null;
    let managerEmail = null;
    try {
      const managerRes = await fetch(
        `https://graph.microsoft.com/v1.0/users/${user.id}/manager?$select=displayName,mail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (managerRes.ok) {
        const managerData = await managerRes.json();
        managerName = managerData.displayName || null;
        managerEmail = managerData.mail || null;
      }
    } catch {
      // Ignora erro
    }

    // Buscar foto de perfil
    let fotoBase64: string | null = null;
    try {
      const photoRes = await fetch(
        `https://graph.microsoft.com/v1.0/users/${user.id}/photo/$value`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (photoRes.ok) {
        const arrayBuffer = await photoRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeType = photoRes.headers.get("content-type") || "image/jpeg";
        fotoBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;
      }
    } catch {
      // Pode não ter foto; ignora erro
    }

    // Montar resposta
    return NextResponse.json({
      nome: user.displayName,
      email: user.mail,
      userPrincipalName: user.userPrincipalName,
      primeiroNome: user.givenName,
      ultimoNome: user.surname,
      cargo: user.jobTitle,
      departamento: user.department,
      telefone: user.mobilePhone || user.businessPhones?.[0] || null,
      lider: managerName,
      emailLider: managerEmail,
      extensionAttribute13:
        user.onPremisesExtensionAttributes?.extensionAttribute13 || null,
      foto: fotoBase64,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erro ao buscar dados.",
      },
      { status: 500 }
    );
  }
}
