import { db } from "@/db/drizzle";
import { profissao } from "@/db/schema";
import { profissoes } from "@/data/profissoes"; // importa direto do ficheiro

async function seedProfissoes() {
  for (const nome of profissoes) {
    await db.insert(profissao).values({ nome });
  }
  console.log("✅ Profissões inseridas com sucesso.");
}

seedProfissoes().catch((e) => {
  console.error("❌ Erro ao inserir profissões:", e);
});
