// lib/syncExtraMicrosoftFields.ts
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function syncExtraMicrosoftFields(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-azure-data?email=${email}`
  );
  if (!res.ok) throw new Error("Erro ao buscar dados adicionais do utilizador");

  const data = await res.json();
  console.log("[syncExtraMicrosoftFields] Dados recebidos:", data);

  await db
    .update(user)
    .set({
      department: data.departamento || null,
      cargo: data.cargo || null,
      manager: data.lider || null,
      emailLider: data.emailLider || null,
      sigla: data.extensionAttribute13 || null,
      updatedAt: new Date(),
    })
    .where(eq(user.email, email));
}
